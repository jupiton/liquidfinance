import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function GET(): Promise<Response> {
  return new Promise<Response>((resolve) => {
    const scriptPath = path.join(process.cwd(), "scripts/spot_assets.py");
    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
      } else {
        // Parse le résultat du script
        const lines = stdout.split('\n').filter(Boolean);
        const assets = [];
        for (const line of lines) {
          if (line.startsWith("---")) continue;
          // Ex: "HYPE : 123.45 (total: 123.45) ≈ 456.78 USD"
          const match = line.match(/^(\w+) : ([^ ]+) \(total: ([^\)]+)\)(?: ≈ ([^ ]+) USD)?/);
          if (match) {
            assets.push({
              coin: match[1],
              available: match[2],
              total: match[3],
              usdValue: match[4] || null,
            });
          }
        }
        resolve(NextResponse.json({ assets, raw: stdout }));
      }
    });
  });
} 