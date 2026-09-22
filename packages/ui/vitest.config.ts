import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    // Default "threads" (worker_threads) shares the main process's event
    // loop with every worker. On a machine where the filesystem/CPU is
    // already under heavy external contention (antivirus real-time
    // scanning, cloud-sync clients like OneDrive watching node_modules),
    // that sharing lets one slow worker starve the others — which looks
    // exactly like what's been reported: the same overlay/portal tests
    // (Tooltip, DropdownMenu, Popover — all Radix Popper-positioned, all
    // slow under jsdom to begin with) timing out, with run-to-run duration
    // that gets worse rather than settling, plus axe-core's global "run"
    // lock never releasing after an aborted test poisoning the tests after
    // it. "forks" runs each test file in its own child process instead —
    // no shared event loop, so one contended file can't starve another.
    pool: "forks",
    poolOptions: {
      forks: {
        // Both bounds set explicitly and consistently. Leaving minForks
        // unset let Vitest/Tinypool derive a default from the machine's
        // logical CPU count — on a machine with enough cores, that
        // default can come out higher than maxForks, and Tinypool throws
        // "options.minThreads and options.maxThreads must not conflict"
        // before a single test runs. Pinning both removes the ambiguity.
        minForks: 1,
        // Capped at 2, not left at some higher default: GitHub-hosted
        // ubuntu-latest runners (this project's CI) have 2 vCPUs. Forks
        // are separate OS processes — each with its own Node startup,
        // module graph, and jsdom instance — so asking for more
        // concurrent forks than there are cores means they time-slice
        // against each other instead of actually running in parallel,
        // which was measurably making the already-slow Radix Popper
        // positioning tests (Tooltip, DropdownMenu, Popover) slower on
        // CI, not faster. Bump this only if CI's runner spec changes.
        maxForks: 2,
      },
    },
    coverage: {
      reporter: ["text", "html"],
      exclude: ["**/*.stories.tsx", "**/index.ts"],
    },
  },
});
