class Comment {
    #id;
    text;
    replies;
    #commentTemplate = document.getElementById('comment-template')
    #replyTemplate = document.getElementById('reply')
    #commentContainerEle
    constructor(id, text, replies = []) {
        this.#id = id
        this.text = text
        this.replies = replies
    }


    #handleReply = (event) => {
        //fetch API call
        let success = true
        if (success && event.target?.parentElement.querySelector('input').value) {
            this.replies.push(
                new Comment(
                    `${this.id}:${this.replies.length + 1}`,
                    event.target?.parentElement.querySelector('input').value,
                    [])
            )
            this.renderReplies(this.#commentContainerEle)
            event.target.parentElement.querySelector('input').value = ''
            event.target.parentElement.querySelector('input').focus()
        }

    }

    getElement() {
        if (this.#commentTemplate) {
            const commentCloneEle = this.#commentTemplate.content.cloneNode(true)

            const commentContainer = commentCloneEle.querySelector('.comment-container')
            this.#commentContainerEle = commentContainer

            const commentDiv = commentCloneEle.querySelector('.comment-container .comment')
            commentDiv.id = this.#id

            const span = commentCloneEle.querySelector('.comment-container .comment span')
            span.textContent = this.text

            const btReply = commentCloneEle.querySelector('.bt-reply')
            btReply.addEventListener('click', this.#handleReply)

            const btReplyShow = commentCloneEle.querySelector('.bt-reply-show')
            const divWrapperAction = commentCloneEle.querySelector('.local-reply-action-div')

            btReplyShow.addEventListener('click', () => {
                divWrapperAction.classList.toggle("hidden")
                divWrapperAction.classList.contains('hidden')? "":
                divWrapperAction.querySelector('input').focus()
            })
            this.renderReplies(commentContainer)
            

            return commentCloneEle
        }

    }

    renderReplies(commentContainer) {
        if (this.replies && this.replies.length > 0) {
            const repliesWrapper = document.createElement('div')
            repliesWrapper.classList.add('replies-wrapper')

            this.replies.forEach((eachReply) => {
                const replyClone = this.#replyTemplate.content.cloneNode(true)
                replyClone.querySelector('.reply').appendChild(eachReply.getElement())
                repliesWrapper.appendChild(replyClone)
            })
            const prev = commentContainer.querySelector('.replies-wrapper')
            if(prev){
                commentContainer.removeChild(prev)
            }

            commentContainer.appendChild(repliesWrapper)
        }
    }
}