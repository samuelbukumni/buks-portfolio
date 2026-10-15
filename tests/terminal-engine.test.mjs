import test from 'node:test';
import assert from 'node:assert/strict';
import { createShell, execute, parseCommand, complete, HOME, getNode } from '../app/terminal-engine.ts';
test('parses quoted arguments, whitespace and escapes', () => {
  assert.deepEqual(parseCommand('  grep "cloud engineering" skills.txt  '), ['grep','cloud engineering','skills.txt']);
  assert.deepEqual(parseCommand('echo hello\\ world'), ['echo','hello world']);
  assert.throws(() => parseCommand('echo "unfinished'), /Unclosed quote/);
});
test('navigation resolves home, parents and files', () => {
  const shell=createShell();
  assert.equal(execute(shell,'cd projects'),'');
  assert.equal(execute(shell,'pwd'),HOME+'/projects');
  assert.match(execute(shell,'cat middleman.md'),/In development/);
  assert.equal(execute(shell,'cd ..'),'');
  assert.equal(execute(shell,'cd ~'),'');
  assert.equal(shell.cwd,HOME);
  assert.match(execute(shell,'cd now.txt'),/not a directory/);
});
test('virtual files are created, copied, moved and removed', () => {
  const shell=createShell();
  assert.equal(execute(shell,'mkdir -p notes/drafts'),'');
  assert.equal(execute(shell,'touch notes/drafts/todo.txt'),'');
  assert.equal(execute(shell,'cp now.txt notes/drafts/now.txt'),'');
  assert.match(execute(shell,'cat notes/drafts/now.txt'),/The Middleman/);
  assert.equal(execute(shell,'mv notes/drafts/now.txt notes/renamed.txt'),'');
  assert.equal(getNode(shell.fs, HOME+'/notes/drafts/now.txt'),undefined);
  assert.equal(execute(shell,'rm notes/renamed.txt'),'');
  assert.match(execute(shell,'rmdir notes'),/not empty/);
  assert.equal(execute(shell,'rm -r notes'),'');
  assert.equal(getNode(shell.fs, HOME+'/notes'),undefined);
});
test('history and autocomplete handle commands and paths', () => {
  const shell=createShell(); execute(shell,'ls'); execute(shell,'cat now.txt');
  assert.match(execute(shell,'history'),/1  ls\n2  cat now.txt\n3  history/);
  assert.equal(complete(shell,'whoam').value,'whoami ');
  assert.equal(complete(shell,'cat now.').value,'cat now.txt ');
  assert.equal(complete(shell,'cd proj').value,'cd projects/');
});
test('help, flags, errors and simulated safety', () => {
  const shell=createShell();
  assert.match(execute(shell,'help ls'),/Usage: ls/);
  assert.match(execute(shell,'man grep'),/Example: grep/);
  assert.match(execute(shell,'ls -la'),/now.txt/);
  assert.match(execute(shell,'ls -h'),/projects\//);
  assert.match(execute(shell,'ls -z'),/unsupported option/);
  assert.match(execute(shell,'git status'),/simulated/);
  assert.match(execute(shell,'curl https:\/\/example.com'),/No request made/);
  assert.match(execute(shell,'sudo hire samuel'),/Permission granted/);
  assert.match(execute(shell,'notacommand'),/command not found/);
  assert.match(execute(shell,'rm -r /'),/Cannot modify the filesystem root/);
});
