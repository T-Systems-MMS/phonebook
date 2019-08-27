---
layout: default
title: General Guide
nav_order: 000
parent: Development Guides
permalink: /pages/development-guides/
has_toc: false
---

# :diamond_shape_with_a_dot_inside: **Development Guides** :diamond_shape_with_a_dot_inside:

## :white_check_mark: **General Guide for developing the Phonebook**

### :open_file_folder: **Project Structure**

The project is splitted in different parts for better clarity and maintenance.

This is the current project structure.

 * **Phonebook (Root)**
   * **[docs:](/phonebook/pages/doc-guides/)** Documents for the whole project hosted with Jekyll on GitHub-Pages
   * **Phonebook.Assets:** Example implementation for serving assets like roomplans or static images
   * **[Phonebook.Frontend:](frontend/general-guide)** Frontend project with all related sources
   * **Phonebook.Source.MockPeopleBackend:** Mock data source 
   * **Phonebook.Source.PeopleSoft:** One of the future data sources for the PeopleSoft application
   * **Phonebook.Demo:** Demo Application of the Phonebook

---

### :hammer: **Workflow to contribute**

1. Create a new Branch.
2. Make some changes and develop a cool new feature or fix a Bug.
3. In order to commit run `npm run commit` to run the interactive Commit utility.
> We are using the angular [angular commit format reference](https://gist.github.com/brianclements/841ea7bffdb01346392c). All commits should adhere to this format in order to trigger automatic releases.
![npm run commit image]({{site.baseurl}}pages/development-guides/media/images/git-cz.png)
4. Create a Pull Request from your Branch.
5. Wait for approval from one of the maintainers.
6. **Extra:** If you're not listed for the type of contribution you can add yourself as a contributor with the [@all-contributors-Bot](https://allcontributors.org/docs/en/overview) by writing `@all-contributors please add @username for` [specification](https://allcontributors.org/docs/en/emoji-key) in your PR.

> If you need a tutorial about important git commands look [here](https://dev.to/dhruv/essential-git-commands-every-developer-should-know-2fl).

---

We have splitted the development documentation in two different parts.

**What do you want to start with?**

<span class="fs-6">
[Frontend](frontend/getting-started){: .btn .btn-purple }
</span>
<span class="fs-6">
[Backend](backend){: .btn .btn-purple }
</span>
