workflow "PR Test" {
  on = "pull_request"
  resolves = ["test"]
}

action "test" {
  uses = "docker://danielhabenicht/github-actions:test"
  secrets = ["GITHUB_TOKEN"]
}
