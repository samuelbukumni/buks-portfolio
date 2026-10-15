export type FileNode = { type: "file"; content: string };
export type DirNode = { type: "dir"; children: Record<string, Node> };
export type Node = FileNode | DirNode;
const file = (content: string): FileNode => ({ type: "file", content });
const dir = (children: Record<string, Node> = {}): DirNode => ({ type: "dir", children });
export const HOME = "/home/buks/portfolio";
export function createFilesystem(): DirNode {
  return dir({ home: dir({ buks: dir({ portfolio: dir({
    "now.txt": file("Building The Middleman. Learning cloud engineering and Linux. Beginning to explore AI evaluation and safety."),
    "about.txt": file("Samuel Oguntona (Buks Samuel) is an Information Systems student at Obafemi Awolowo University, Ile-Ife. He builds software and investigates how it works."),
    "skills.txt": file("Technologies I work with: Next.js, TypeScript, Supabase, Python, Git, Linux Mint. Cloud fundamentals and AI evaluation are current learning areas."),
    "education.txt": file("Information Systems at Obafemi Awolowo University, Ile-Ife. HP LIFE courses: AI for Beginners, Customer Experience (CX), Effective Presentations, Business Email."),
    "experience.txt": file("Building The Middleman: interface, accounts, database, payments, and deployment. In development. Also exploring independent software experiments; see projects/."),
    "contact.txt": file("samuelbukumni@gmail.com\nGitHub: https://github.com/samuelbukumni\nLinkedIn: https://www.linkedin.com/in/oguntona-samuel/\nX: https://x.com/bukssamuel25\nTikTok: https://www.tiktok.com/@bukssamuel"),
    "resume.txt": file("Download the public résumé: /resume/Samuel-Oguntona-Resume-Public.pdf"),
    projects: dir({
      "middleman.md": file("The Middleman: a digital-product marketplace for Nigerian buyers and creators, with escrow around ready-made digital products. Next.js, TypeScript, Supabase, Vercel. In development. https://www.themiddleman.com.ng"),
      "skillprint.md": file("SkillPrint: a concept for adaptive learner assessment and a suggested course starting point. Not a released product."),
      "samuel.md": file("S.A.M.U.E.L.: a Python personal-assistant experiment with local tools, cloud models, and permission before actions."),
      "synapse.md": file("SYNAPSE: a multi-model discussion experiment exploring independent answers, critique and revision without forced consensus."),
    }),
  }) }) }) });
}
export interface Shell { fs: DirNode; cwd: string; history: string[]; aliases: Record<string, string>; started: number; exited: boolean }
export function createShell(): Shell { return { fs: createFilesystem(), cwd: HOME, history: [], aliases: { ll: "ls -la" }, started: Date.now(), exited: false }; }
export function parseCommand(input: string): string[] {
  const tokens: string[] = []; let current = "", quote = "", escaped = false, active = false;
  for (const char of input.trim()) {
    if (escaped) { current += char; escaped = false; active = true; continue; }
    if (char === "\\" && quote !== "'") { escaped = true; active = true; continue; }
    if (quote) { if (char === quote) quote = ""; else current += char; active = true; continue; }
    if (char === "'" || char === '"') { quote = char; active = true; continue; }
    if (/\s/.test(char)) { if (active) { tokens.push(current); current = ""; active = false; } continue; }
    current += char; active = true;
  }
  if (quote) throw new Error("Unclosed quote");
  if (escaped) current += "\\";
  if (active) tokens.push(current);
  return tokens;
}
export function resolvePath(cwd: string, path = "."): string {
  const source = path === "~" ? HOME : path.startsWith("~/") ? HOME + path.slice(1) : path.startsWith("/") ? path : `${cwd}/${path}`;
  const parts: string[] = [];
  for (const part of source.split("/")) { if (!part || part === ".") continue; if (part === "..") parts.pop(); else parts.push(part); }
  return "/" + parts.join("/");
}
export function getNode(fs: DirNode, path: string): Node | undefined {
  let node: Node = fs;
  for (const part of path.split("/").filter(Boolean)) { if (node.type !== "dir") return undefined; node = node.children[part]; if (!node) return undefined; }
  return node;
}
function parentAt(shell: Shell, path: string): { parent: DirNode; name: string } | string {
  const parts = path.split("/").filter(Boolean), name = parts.pop();
  const parent = getNode(shell.fs, "/" + parts.join("/"));
  if (!name) return "Cannot modify the filesystem root";
  if (!parent || parent.type !== "dir") return `Parent directory does not exist: /${parts.join("/")}`;
  return { parent, name };
}
const categories: Record<string, string[]> = {
  Navigation: ["ls", "cd", "pwd", "tree", "clear", "exit"],
  Files: ["cat", "touch", "mkdir", "rmdir", "cp", "mv", "rm", "head", "tail", "less"],
  System: ["whoami", "hostname", "uname", "date", "uptime", "history", "top", "htop", "ps", "free", "df", "du"],
  Networking: ["ping", "curl", "wget", "ifconfig", "ip", "nslookup", "dig"],
  Utilities: ["echo", "printf", "grep", "find", "wc", "sort", "uniq", "which", "alias"],
  Development: ["git", "python", "python3", "node", "npm", "docker", "ssh"],
  Portfolio: ["about", "projects", "skills", "experience", "education", "contact", "resume", "socials", "cloud", "linux"],
  Fun: ["coffee", "sudo", "matrix", "fortune", "joke", "cowsay", "sl", "hack", "secret"],
};
type Handler = (shell: Shell, args: string[]) => string;
type Command = { usage: string; example: string; description: string; run: Handler };
const registry: Record<string, Command> = {};
function register(name: string, usage: string, example: string, description: string, run: Handler) { registry[name] = { usage, example, description, run }; }
const bad = (name: string, args: string[], supported: string) => args.find(a => a.startsWith("-") && a !== "-") ? `${name}: unsupported option ${args.find(a => a.startsWith("-") && a !== "-")}. Supported: ${supported}` : "";
const read = (s: Shell, path: string): string => { const node = getNode(s.fs, resolvePath(s.cwd, path)); return !node ? `No such file: ${path}` : node.type === "dir" ? `Is a directory: ${path}` : node.content; };
const names = (node: DirNode, all = false) => Object.keys(node.children).filter(n => all || !n.startsWith(".")).sort();
register("help", "help [command]", "help cd", "List categories or explain a command.", (_s, a) => a.length ? registry[a[0]] ? `${a[0]} — ${registry[a[0]].description}\nUsage: ${registry[a[0]].usage}\nExample: ${registry[a[0]].example}` : `No help for ${a[0]}` : Object.entries(categories).map(([k,v]) => `${k}: ${v.join(" · ")}`).join("\n") + "\nUse help <command> or man <command>. This is a browser simulation.");
register("man", "man <command>", "man ls", "Show command usage and example.", (s,a) => registry.help.run(s,a));
register("pwd", "pwd", "pwd", "Print current virtual directory.", s => s.cwd);
register("cd", "cd [directory]", "cd projects; cd ..; cd ~", "Change virtual directory.", (s,a) => { const path = resolvePath(s.cwd,a[0] || "~"), node = getNode(s.fs,path); if (!node) return `cd: no such directory: ${a[0]}`; if (node.type !== "dir") return `cd: not a directory: ${a[0]}`; s.cwd = path; return ""; });
register("ls", "ls [-a|-l|-h] [path]", "ls -la projects", "List files; -a shows hidden, -l details, -h readable sizes.", (s,a) => { let all=false, long=false, human=false, path="."; for (const arg of a) { if (arg.startsWith("-") && arg !== "-") { for (const flag of arg.slice(1)) { if (flag === "a") all=true; else if (flag === "l") long=true; else if (flag === "h") human=true; else return `ls: unsupported option -${flag}. Supported: -a -l -h`; } } else path=arg; } const node=getNode(s.fs,resolvePath(s.cwd,path)); if (!node) return `ls: cannot access '${path}': No such file or directory`; if (node.type === "file") return path; return names(node,all).map(n => { const child=node.children[n]; return long ? `${child.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--"}  ${child.type === "dir" ? "-" : human ? `${new TextEncoder().encode(child.content).length}B` : new TextEncoder().encode(child.content).length}  ${n}${child.type === "dir" ? "/" : ""}` : `${n}${child.type === "dir" ? "/" : ""}`; }).join(long ? "\n" : "    "); });
register("tree", "tree [path]", "tree projects", "Show virtual directory tree.", (s,a) => { const path=a[0] || ".", node=getNode(s.fs,resolvePath(s.cwd,path)); if (!node) return `tree: no such directory: ${path}`; let count=0; const walk=(n: Node, prefix: string, depth: number): string[] => n.type === "file" || depth > 8 ? [] : names(n).flatMap((name,i,arr) => { if (++count > 150) return []; const child=n.children[name], last=i === arr.length-1; return [`${prefix}${last ? "└── " : "├── "}${name}${child.type === "dir" ? "/" : ""}`, ...walk(child,prefix+(last ? "    " : "│   "),depth+1)]; }); return [path,...walk(node,"",0)].join("\n"); });
register("cat", "cat <file> [file...]", "cat projects/middleman.md", "Read virtual text files.", (s,a) => a.length ? a.map(p => read(s,p)).join("\n") : "cat: provide a file name");
for (const name of ["head","tail","less"] as const) register(name, `${name} [-n count] <file>`, `${name} now.txt`, "Read virtual text files.", (s,a) => { let count=10; if (a[0] === "-n") { count=Number(a[1]); a=a.slice(2); if (!Number.isInteger(count) || count < 0) return `${name}: invalid line count`; } else if (a[0]?.startsWith("-")) return `${name}: unsupported option ${a[0]}. Supported: -n`; if (!a.length) return `${name}: provide a file name`; const content=read(s,a[0]); if (content.startsWith("No such file:") || content.startsWith("Is a directory:")) return content; const lines=content.split("\n"); return name === "less" ? content + "\n(end — browser preview)" : (name === "head" ? lines.slice(0,count) : lines.slice(-count || lines.length)).join("\n"); });
register("mkdir", "mkdir [-p] <directory>", "mkdir notes", "Create virtual directories for this session.", (s,a) => { const recursive=a[0] === "-p"; if (recursive) a=a.slice(1); const err=bad("mkdir",a,"-p"); if (err) return err; if (!a.length) return "mkdir: missing directory"; return a.map(p => { const path=resolvePath(s.cwd,p); if (getNode(s.fs,path)) return `mkdir: already exists: ${p}`; if (recursive) { let current=s.fs; for (const part of path.split("/").filter(Boolean)) { if (!current.children[part]) current.children[part]=dir(); const next=current.children[part]; if (next.type !== "dir") return `mkdir: not a directory: ${part}`; current=next; } return ""; } const result=parentAt(s,path); if (typeof result === "string") return `mkdir: ${result}`; result.parent.children[result.name]=dir(); return ""; }).filter(Boolean).join("\n"); });
register("touch", "touch <file> [file...]", "touch notes.txt", "Create empty virtual files for this session.", (s,a) => { if (!a.length) return "touch: missing file"; return a.map(p => { const path=resolvePath(s.cwd,p), result=parentAt(s,path); if (typeof result === "string") return `touch: ${result}`; if (!result.parent.children[result.name]) result.parent.children[result.name]=file(""); return ""; }).filter(Boolean).join("\n"); });
register("rmdir", "rmdir <directory>", "rmdir notes", "Remove an empty virtual directory.", (s,a) => { if (a.length !== 1) return "rmdir: provide one directory"; const path=resolvePath(s.cwd,a[0]), node=getNode(s.fs,path), result=parentAt(s,path); if (!node) return `rmdir: no such directory: ${a[0]}`; if (node.type !== "dir") return `rmdir: not a directory: ${a[0]}`; if (Object.keys(node.children).length) return `rmdir: directory not empty: ${a[0]}`; if (path === s.cwd || s.cwd.startsWith(path+"/")) return "rmdir: cannot remove the current directory"; if (typeof result === "string") return result; delete result.parent.children[result.name]; return ""; });
register("rm", "rm [-r] <path>", "rm notes.txt", "Remove virtual files; -r removes directories.", (s,a) => { const recursive=a[0] === "-r"; if (recursive) a=a.slice(1); const err=bad("rm",a,"-r"); if (err) return err; if (!a.length) return "rm: missing path"; return a.map(p => { const path=resolvePath(s.cwd,p), node=getNode(s.fs,path), result=parentAt(s,path); if (!node) return `rm: no such file: ${p}`; if (node.type === "dir" && !recursive) return `rm: is a directory: ${p} (use -r)`; if (path === s.cwd || s.cwd.startsWith(path+"/")) return "rm: cannot remove the current directory"; if (typeof result === "string") return result; delete result.parent.children[result.name]; return ""; }).filter(Boolean).join("\n"); });
function destination(s: Shell, source: string, target: string): { parent: DirNode; name: string } | string { const targetPath=resolvePath(s.cwd,target), node=getNode(s.fs,targetPath); return parentAt(s,node?.type === "dir" ? resolvePath(targetPath,source.split("/").at(-1)) : targetPath); }
for (const name of ["cp","mv"] as const) register(name, `${name} [-r] <source> <destination>`, `${name} now.txt copy.txt`, `${name === "cp" ? "Copy" : "Move"} virtual files. -r supports directories.`, (s,a) => { const recursive=a[0] === "-r"; if (recursive) a=a.slice(1); const err=bad(name,a,"-r"); if (err) return err; if (a.length !== 2) return `${name}: provide source and destination`; const srcPath=resolvePath(s.cwd,a[0]), src=getNode(s.fs,srcPath), dest=destination(s,a[0],a[1]); if (!src) return `${name}: no such file: ${a[0]}`; if (src.type === "dir" && !recursive) return `${name}: is a directory (use -r): ${a[0]}`; if (typeof dest === "string") return `${name}: ${dest}`; const targetPath=resolvePath(s.cwd,a[1]); const destPath=getNode(s.fs,targetPath)?.type === "dir" ? resolvePath(targetPath,a[0].split("/").at(-1)) : targetPath; if (srcPath === destPath || (src.type === "dir" && destPath.startsWith(srcPath+"/"))) return `${name}: cannot copy or move a directory into itself`; if (name === "cp") dest.parent.children[dest.name]=structuredClone(src); else { const origin=parentAt(s,srcPath); if (typeof origin === "string" || s.cwd === srcPath || s.cwd.startsWith(srcPath+"/")) return "mv: cannot move current directory"; dest.parent.children[dest.name]=src; delete origin.parent.children[origin.name]; } return ""; });
register("echo", "echo [text...]", "echo hello", "Print text; quotes group words.", (_s,a) => a.join(" "));
register("printf", "printf <format> [values...]", "printf 'Hello %s\\n' Samuel", "Format %s and %d placeholders (simulated).", (_s,a) => { if (!a.length) return "printf: missing format"; let index=1; return a[0].replace(/%[sd]|%%/g, m => m === "%%" ? "%" : m === "%d" ? String(Number(a[index++] || 0)) : a[index++] || "").replace(/\\n/g,"\n"); });
register("grep", "grep [-i|-n] <pattern> <file>", "grep -i cloud skills.txt", "Search text in a virtual file.", (s,a) => { let insensitive=false, numbered=false; while (a[0]?.startsWith("-")) { const f=a.shift()!; if (!/^-[in]+$/.test(f)) return `grep: unsupported option ${f}. Supported: -i -n`; insensitive ||= f.includes("i"); numbered ||= f.includes("n"); } if (a.length !== 2) return "grep: provide pattern and file"; const content=read(s,a[1]); if (content.startsWith("No such file:") || content.startsWith("Is a directory:")) return content; return content.split("\n").map((line,i) => ({line,i})).filter(({line}) => (insensitive ? line.toLowerCase() : line).includes(insensitive ? a[0].toLowerCase() : a[0])).map(({line,i}) => numbered ? `${i+1}:${line}` : line).join("\n") || "(no matches)"; });
register("find", "find [path] [-name pattern]", "find projects -name '*.md'", "Find virtual paths by name (* wildcard).", (s,a) => { const path=a[0] && a[0] !== "-name" ? a.shift()! : "."; if (a.length && (a.length !== 2 || a[0] !== "-name")) return "find: supported syntax: find [path] [-name pattern]"; const node=getNode(s.fs,resolvePath(s.cwd,path)); if (!node) return `find: no such path: ${path}`; const pattern=a[1]?.replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*"); const re=pattern ? new RegExp(`^${pattern}$`) : null; const found: string[]=[]; const walk=(n: Node,p: string,depth: number) => { if (depth>10 || found.length>150) return; if (!re || re.test(p.split("/").at(-1)!)) found.push(p); if (n.type === "dir") for (const child of names(n,true)) walk(n.children[child],`${p === "." ? "." : p}/${child}`,depth+1); }; walk(node,path,0); return found.join("\n") || "(no matches)"; });
for (const name of ["wc","sort","uniq"] as const) register(name, `${name} <file>`, `${name} skills.txt`, "Process lines in a virtual text file.", (s,a) => { const err=bad(name,a,"none"); if (err) return err; if (a.length !== 1) return `${name}: provide one file`; const content=read(s,a[0]); if (content.startsWith("No such file:") || content.startsWith("Is a directory:")) return content; if (name === "wc") return `${content ? content.split("\n").length : 0} ${content.trim() ? content.trim().split(/\s+/).length : 0} ${new TextEncoder().encode(content).length} ${a[0]}`; const lines=content.split("\n"); return (name === "sort" ? lines.sort() : lines.filter((v,i) => i === 0 || v !== lines[i-1])).join("\n"); });
register("history", "history", "history", "Show up to 50 commands from this session.", s => s.history.map((h,i) => `${i+1}  ${h}`).join("\n"));
register("alias", "alias [name='command']", "alias ll='ls -la'", "List or set session aliases.", (s,a) => { if (!a.length) return Object.entries(s.aliases).map(([k,v]) => `alias ${k}='${v}'`).join("\n"); if (a.length !== 1 || !a[0].includes("=")) return "alias: use name='command'"; const [key,...value]=a[0].split("="); if (!/^[a-z][a-z0-9_-]*$/i.test(key) || !value.join("=") || registry[key]) return "alias: invalid name, value, or reserved command"; s.aliases[key]=value.join("="); return ""; });
register("which", "which <command>", "which python", "Locate a simulated command.", (s,a) => a.length !== 1 ? "which: provide one command" : registry[a[0]] || s.aliases[a[0]] ? `/virtual/bin/${a[0]} (simulated)` : `${a[0]} not found`);
register("whoami", "whoami", "whoami", "Print portfolio user.", () => "Samuel Oluwabukunmi Oguntona / Buks Samuel\nI build software and investigate the systems underneath it.\nInformation Systems · OAU · Nigeria");
register("hostname", "hostname", "hostname", "Print virtual hostname.", () => "portfolio-sim (virtual)");
register("uname", "uname [-a]", "uname -a", "Print simulated platform information.", (_s,a) => a.length && a[0] !== "-a" ? `uname: unsupported option ${a[0]}. Supported: -a` : a[0] ? "Linux portfolio-sim browser 0.1 virtual-shell (simulated)" : "Linux (simulated)");
register("date", "date", "date", "Show local browser date and time.", () => new Date().toLocaleString());
register("uptime", "uptime", "uptime", "Show virtual session duration.", s => `virtual session up ${Math.floor((Date.now()-s.started)/60000)} min (simulated)`);
for (const [name,message] of Object.entries({top:"No host processes are exposed. Browser session: terminal UI active (simulated).",htop:"Interactive process monitoring is unavailable in this browser simulation. Try top.",ps:"PID  COMMAND\n  1  portfolio-terminal (simulated)",free:"Memory details are not available to browser pages. Virtual shell only.",df:"Filesystem     Size  Used  Avail\nportfolio-vfs  virtual  session-only  virtual",du:"Virtual filesystem contents are held in memory for this session."})) register(name,`${name}`,name,"Show simulated system information.",(_s,a) => bad(name,a,"none") || message);
for (const [name,message] of Object.entries({ping:"No packets sent. Network commands are simulated here.",curl:"No request made. Visit the portfolio links in contact.txt directly.",wget:"No download started. Network commands are simulated here.",ifconfig:"virtual0: browser-only interface (simulated); no host addresses exposed.",ip:"Virtual interface only. No real network configuration is available.",nslookup:"DNS queries are disabled in this terminal simulation.",dig:"DNS queries are disabled in this terminal simulation."})) register(name,`${name} [arguments]`,`${name} example.com`,"Explain the browser-only network simulation.",() => message);
register("git", "git status|log|branch|help", "git status", "Inspect a simulated portfolio repository snapshot.", (_s,a) => a[0] === "status" ? "On branch portfolio-demo (simulated)\nWorking tree: virtual session files only; no real repository accessed." : a[0] === "branch" ? "* portfolio-demo (simulated)" : a[0] === "log" ? "No real commit history exposed in this simulation." : "git: supported subcommands: status, branch, log, help (simulated)");
for (const name of ["python","python3","node","npm","docker","ssh"] ) register(name,`${name} [arguments]`,name,`Explain ${name} availability in this browser.`,(_s,a) => `${name}: unavailable in this browser simulation; no code or system command was executed.${a.length ? " Arguments ignored." : ""}`);
const portfolio: Record<string,string> = { about:"about.txt", skills:"skills.txt", experience:"experience.txt", education:"education.txt", contact:"contact.txt", resume:"resume.txt" };
for (const [name,path] of Object.entries(portfolio)) register(name,name,name,"Read portfolio information.",s => read(s,`${HOME}/${path}`));
register("projects", "projects", "projects", "List portfolio projects and their stage.", s => { const node=getNode(s.fs,`${HOME}/projects`) as DirNode; return names(node).map(n => `${n.replace(/\.md$/ , "")} — ${node.children[n].type === "file" ? node.children[n].content : ""}`).join("\n"); });
register("socials", "socials", "socials", "Show public social profiles.", s => read(s,`${HOME}/contact.txt`).split("\n").slice(1).join("\n"));
register("cloud", "cloud", "cloud", "Describe current cloud learning.", () => "Currently learning compute, identity, deployment, observability and how infrastructure fits together.");
register("linux", "linux", "linux", "Describe Linux interest.", () => "Processes, services, permissions and networking. The terminal is where I like to follow the clues.");
const fun: Record<string,string> = { coffee:"Brewing... ☕\nCoffee ready. The bug is still there, but we can discuss it calmly.", matrix:"01001000 01100101 01101100 01101100 01101111\nJust a simulation; no red pill required.", fortune:"A useful error message is a small kindness to your future self.", joke:"Why did the developer open a terminal? To find some closure.", sl:"You typed sl. Imagine a tiny train passing through the terminal. Choo choo.", hack:"Access granted to... the help menu. Try help.", secret:"You found it. There is no secret production server behind this page." };
for (const [name,message] of Object.entries(fun)) register(name,name,name,"A small terminal Easter egg.",() => message);
register("sudo", "sudo hire samuel", "sudo hire samuel", "Ask for a very specific kind of elevated access.", (_s,a) => a.join(" ").toLowerCase() === "hire samuel" ? "Permission granted. Send a message to samuelbukumni@gmail.com — the real decision is yours." : "sudo: no elevated privileges in a browser. Try sudo hire samuel.");
register("cowsay", "cowsay <message>", "cowsay hello", "A small ASCII cow for your text.", (_s,a) => { const message=a.join(" ").slice(0,120) || "moo"; return ` ${"_".repeat(message.length+2)}\n< ${message} >\n ${"-".repeat(message.length+2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`; });
register("clear", "clear", "clear", "Clear displayed terminal output.", () => "");
register("exit", "exit", "exit", "End virtual session; enter a command to resume.", s => { s.exited=true; return "Session ended. Type a command to start again."; });
export function commandNames(shell: Shell): string[] { return [...Object.keys(registry),...Object.keys(shell.aliases)].sort(); }
export function complete(shell: Shell, input: string): { value: string; matches: string[] } {
  const start=input.match(/^([\s\S]*?)([^\s]*)$/); if (!start) return {value:input,matches:[]};
  const prefix=start[1], fragment=start[2]; if (!prefix) { const matches=commandNames(shell).filter(c => c.startsWith(fragment)); return {value:matches.length === 1 ? matches[0]+" " : input,matches}; }
  const path=fragment.includes("/") ? fragment.slice(0,fragment.lastIndexOf("/")+1) : "";
  const node=getNode(shell.fs,resolvePath(shell.cwd,path || ".")); if (!node || node.type !== "dir") return {value:input,matches:[]};
  const matches=names(node).filter(n => n.startsWith(fragment.slice(path.length))).map(n => path+n+(node.children[n].type === "dir" ? "/" : ""));
  return {value:matches.length === 1 ? prefix+matches[0]+(matches[0].endsWith("/") ? "" : " ") : input,matches};
}
export function execute(shell: Shell, input: string): string {
  const trimmed=input.trim(); if (!trimmed) return "";
  shell.history.push(trimmed); shell.history=shell.history.slice(-50); shell.exited=false;
  let tokens: string[]; try { tokens=parseCommand(trimmed); } catch (error) { return (error as Error).message; }
  let [name,...args]=tokens;
  if (shell.aliases[name]) { try { [name,...args]=[...parseCommand(shell.aliases[name]),...args]; } catch { return "Invalid alias"; } }
  const command=registry[name]; if (!command) return `${name}: command not found. Type help to see available commands.`;
  if (!["help","man","alias","echo","printf","sudo","cowsay"].includes(name) && args.some(a => /[;&|`$<>]/.test(a))) return `${name}: shell operators and expansion are not supported in this simulation.`;
  if (args.some(a => a.startsWith("-") && a !== "-") && !["ls","mkdir","rm","cp","mv","head","tail","less","grep","find","uname","git","alias","echo","printf","sudo","cowsay","help","man"].includes(name)) return `${name}: unsupported option ${args.find(a => a.startsWith("-"))}. Try help ${name}.`;
  return command.run(shell,args);
}
