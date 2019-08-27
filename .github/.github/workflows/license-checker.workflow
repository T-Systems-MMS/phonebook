workflow "Scan for license issues" {
  on = "pull_request"
  resolves = ["license-checker"]
}

action "license-checker" {
  uses = "docker://cdssnc/node-license-checker-github-action",
  args = "--direct --onlyAllow 'MIT'"
}
