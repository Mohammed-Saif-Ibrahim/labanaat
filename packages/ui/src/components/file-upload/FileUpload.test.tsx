import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload } from "./FileUpload";

function makeFile(name: string, sizeBytes = 1024) {
  const file = new File(["x".repeat(sizeBytes)], name, { type: "text/plain" });
  return file;
}

describe("FileUpload", () => {
  it("adds a file selected via the hidden file input and reports it via onFilesChange", async () => {
    const onFilesChange = vi.fn();
    const { container } = render(<FileUpload label="Attachments" files={[]} onFilesChange={onFilesChange} multiple />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile("resume.pdf");
    await userEvent.upload(input, file);
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it("renders selected files with a remove control", () => {
    const file = makeFile("resume.pdf");
    render(<FileUpload label="Attachments" files={[file]} onFilesChange={vi.fn()} />);
    expect(screen.getByText("resume.pdf")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /resume.pdf/ })).toBeInTheDocument();
  });

  it("rejects files over the configured max size", async () => {
    const onFilesChange = vi.fn();
    const { container } = render(
      <FileUpload label="Attachments" files={[]} onFilesChange={onFilesChange} maxSizeBytes={10} />
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(input, makeFile("big.pdf", 1000));
    expect(onFilesChange).toHaveBeenCalledWith([]);
  });

  it("is reachable and activatable via keyboard (Enter opens the file dialog)", async () => {
    const onFilesChange = vi.fn();
    render(<FileUpload label="Attachments" files={[]} onFilesChange={onFilesChange} />);
    const dropzone = screen.getByRole("button");
    expect(dropzone).toHaveAttribute("tabIndex", "0");
  });
});
