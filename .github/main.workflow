workflow "PR Test" {
  on = "pull_request"
  resolves = ["test"]
}

action "test" {
  uses = "docker://danielhabenicht/github-actions:test"
  secrets = ["GITHUB_TOKEN"]
}

workflow "shaking finger action" {
  on = "pull_request"
  resolves = ["post gif on fail"]
}

action "post gif on fail" {
  uses = "jessfraz/shaking-finger-action@master"
  secrets = ["GITHUB_TOKEN"]
}
