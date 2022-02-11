### E-book Hub Strategy - GitHub Flow

#### Braching Startegy

**1. The main branch**

> The main branch should always remain stable, and we should always be able to pull from it.
> This is maintained by the practice that something should only be merged into the main branch once it is considered 'release ready', meaning that features are only merged back into the main branch after they meet the requirements for that feature, and have been heavily tested.
> (avoid\*) It is very rare to directly edit the project on the main branch as we don't want to risk putting it in an unstable state.

**2. Branching**

> Create the branch with the name of Issue# you are working on.
> Push the work to respected branch of that issue#.

**3. Committing**

> As mentioned, we push and commit changes to our branches regularly. This acceptable to do because we won't mess up anyone else's work since everything that is not in the main branch is considered as being worked on/in development.
> Write the Commit message with borad description and assigned the issue# with each commit.

**4. Pulling **

> Once the work is pushed into respected branch to that issue#.
> Create a pull request and assigne to other devs to review it and set labels and assign to respected sprint.

**5. Merging**

> When the assignee of a development task feels that their code fully implements the requirements of that task and has been heavily tested, a merge request for the branch can be made.
> Then, the other developers of the project can review the request and report back any issues they may have/find to the assignee of the task.
> Once all these issues are fixed/agreed upon, the branch can safely be merged back into the main branch.

**6. Issues**

> Create the Issues with format [issue type]issue heading
> create labels as per priority and issue type
> Assigne to one or multiple devs.
> Choose the correct Sprint while assigning.

**Advantages:**

Using this strategy provides our team with numerous advantages in regards to our workflow.

Firstly, the main branch is always kept in a stable state meaning that there is always something safe to pull from and create new branches off of. If there is an issue in the main branch, commits will be reverted or new commits will be made to fix the issue.

Addtional branch name Developer will created and work will merge to it and during the release day work will moved from developer to master bracnh to release the sprint.

In addition, having lots of descriptive branches breaks things down and keeps things organized. The many branches in the project helps us as developers stay organized and on task for what we are currently supposed to be implementing for the project and allows for multiple people to work on the same feature at one time.

Furthermore, by committing changes constantly to our branches, these changes often end up being small which makes it easier to revert back to previous states and isolate where in the code a bug might be. This system is also motivational! Making lots of small changes and seeing all of those commits reflected in the change log provides the feeling that you're constantly making progress.

As well, reviewing each other's code by making merge requests ensures that there is always at least 2 people who have looked at the code which allows any issues and bugs to be found faster and more frequently.

And finally, the rules are few and easy to remember. A simple system means less mental overhead and stress on the team which is always a welcome benefit.
