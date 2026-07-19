/**
 * Extract prompt text from MDX content.
 * Returns only the text between the "## Prompt" heading and the next "## " heading.
 * Leading/trailing whitespace is trimmed.
 */
export function extractPromptText(content: string): string {
  const lines = content.split("\n");
  let capturing = false;
  const promptLines: string[] = [];

  for (const line of lines) {
    if (line.match(/^##\s+Prompt/i)) {
      capturing = true;
      continue;
    }
    if (capturing && line.match(/^##\s/)) {
      break;
    }
    if (capturing) {
      promptLines.push(line);
    }
  }

  return promptLines.join("\n").trim();
}
