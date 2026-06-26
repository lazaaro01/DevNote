import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDir = path.resolve("content");
let errors = 0;

const requiredFields = ["title", "description", "category", "tags", "featured", "publishedAt"];

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

const files = walk(contentDir);

for (const file of files) {
  const raw = fs.readFileSync(file, "utf-8");
  const { data } = matter(raw);
  const relPath = path.relative(contentDir, file);

  for (const field of requiredFields) {
    if (!(field in data) || data[field] === undefined || data[field] === "") {
      console.error(`  ERROR [${relPath}] Campo obrigatório ausente: "${field}"`);
      errors++;
    }
  }

  if (data.tags && !Array.isArray(data.tags)) {
    console.error(`  ERROR [${relPath}] "tags" deve ser uma lista`);
    errors++;
  }

  if (data.publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt)) {
    console.error(`  ERROR [${relPath}] "publishedAt" deve estar no formato YYYY-MM-DD, mas recebeu "${data.publishedAt}"`);
    errors++;
  }

  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    console.error(`  ERROR [${relPath}] "featured" deve ser booleano`);
    errors++;
  }
}

console.log(`\nValidação concluída: ${files.length} arquivos, ${errors} erros.`);
process.exit(errors > 0 ? 1 : 0);
