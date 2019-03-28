workflow "PR Test" {
  on = "pull_request"
  resolves = ["test"]
}

action "test" {
  uses = "docker://danielhabenicht/github-actions:test"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Comment on New Issues" {
  resolves = ["AddComment"]
  on = "issues"
}

action "AddComment" {
  uses = "waffleio/gh-actions/action-newissuecomment@master"
  secrets = ["GITHUB_TOKEN"]
}
