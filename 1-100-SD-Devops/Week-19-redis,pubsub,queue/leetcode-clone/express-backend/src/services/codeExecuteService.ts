import { spawn } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

interface ExecutionResult {
  success: boolean;
  output: string;
  executionTime: number;
}

// Block dangerous patterns
const BANNED_PATTERNS = [
  /\bimport\s+os\b/,
  /\bsubprocess\b/,
  /\bexec\s*\(/,
  /\beval\s*\(/,
  /\bopen\s*\(/,
  /__import__\s*\(/,
  /\binput\s*\(/ // block input() to avoid hanging
];

function isSafe(code: string): boolean {
  return !BANNED_PATTERNS.some((regex) => regex.test(code));
}

function createTempFile(code: string): string {
  const filePath = path.join(os.tmpdir(), `exec_${Date.now()}.py`);
  fs.writeFileSync(filePath, code);
  return filePath;
}

function cleanup(filePath: string) {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export async function executePython(code: string): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    if (!isSafe(code)) {
      return resolve({
        success: false,
        output: "Blocked unsafe/unsupported code (input, OS commands, etc.)",
        executionTime: 0,
      });
    }

    const filePath = createTempFile(code);
    const start = Date.now();

    // Run the user code as-is
    const proc = spawn("docker", [
      "run",
      "--rm",
      "-i",
      "-v", `${filePath}:/tmp/code.py:ro`, // mount file read-only
      "python:3.12",
      "python3",
      "/tmp/code.py"
    ]);

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (data) => (stdout += data.toString()));
    proc.stderr.on("data", (data) => (stderr += data.toString()));

    proc.on("close", (code) => {
      cleanup(filePath);
      resolve({
        success: code === 0,
        output: code === 0 ? stdout || "Executed with no output" : stderr,
        executionTime: Date.now() - start,
      });
    });

    proc.on("error", (err) => {
      cleanup(filePath);
      resolve({
        success: false,
        output: `Error: ${err.message}`,
        executionTime: Date.now() - start,
      });
    });

    // Safety: kill if hangs
    setTimeout(() => {
      if (!proc.killed) {
        proc.kill("SIGKILL");
        cleanup(filePath);
        resolve({
          success: false,
          output: "⏱ Timeout (5s)",
          executionTime: 5000,
        });
      }
    }, 5000);
  });
}
