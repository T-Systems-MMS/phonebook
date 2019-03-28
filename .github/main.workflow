
workflow "PR Test" {
  on = "pull_request"
  resolves = ["test"]
}

action "test" {
  uses = "DanielHabenicht/github-actions/test@master"
  secrets = ["GITHUB_TOKEN"]
}
