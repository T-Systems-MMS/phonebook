
workflow "PR Test" {
  on = "pull_request"
  resolves = ["test"]
}

action "test" {
  uses = "docker://danielhabenicht/github-actions"
  secrets = ["GITHUB_TOKEN"]
}
