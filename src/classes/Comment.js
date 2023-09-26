class Comment {
    #id;
    text;
    replies;
    #commentTemplate = commentTemplate
    #replyTemplate = replyTemplate
    #commentContainerEle

    constructor(id, text, replies = []) {
        this.#id = id
        this.text = text
        this.replies = replies
    }


    #handleReply = (event) => {
        event.preventDefault()
        //fetch API call
        let success = true
        if (success && event.target.reply.value) {
            this.replies.push(
                new Comment(
                    `${this.id}:${this.replies.length + 1}`,
                    event.target.reply.value,
                    [])
            )
            this.renderReplies()
            event.target.reply.value = ''
            event.target.reply.focus()
        }

    }

    getElement() {
        if (this.#commentTemplate) {
            const commentCloneEle = this.#commentTemplate.content.cloneNode(true)

            this.#commentContainerEle = commentCloneEle.querySelector('.comment-container')

            const commentDiv = commentCloneEle.querySelector('.comment-container .comment')
            commentDiv.id = this.#id

            const span = commentCloneEle.querySelector('.comment-container .comment span')
            span.textContent = this.text
            
            const localReplyActionForm = commentCloneEle.querySelector('.local-reply-action-div')
            localReplyActionForm.addEventListener('submit', this.#handleReply)

            const btReplyShow = commentCloneEle.querySelector('.bt-reply-show')
            const divWrapperAction = commentCloneEle.querySelector('.local-reply-action-div')

            btReplyShow.addEventListener('click', () => {
                divWrapperAction.classList.toggle("hidden")
                divWrapperAction.querySelector('input').focus()
            })
            this.renderReplies()
            return commentCloneEle
        }

    }

    renderReplies() {
        if (this.replies && this.replies.length > 0 && this.#commentContainerEle) {
            const repliesWrapper =  this.#commentContainerEle.querySelector('.replies-wrapper')
            repliesWrapper.textContent = ''
            repliesWrapper.append(...this.replies.map((eachReply) => {
                const replyClone = this.#replyTemplate.content.cloneNode(true)
                replyClone.querySelector('.reply').appendChild(eachReply.getElement())
                return replyClone
            }))
        }
    }
}