const commentsSection = document.querySelector('#comments-container .comments-section')


const comments = [
    new Comment("1", "Nice pic dear!!", [
        new Comment("1:1", "Why are you commenting on my girlfriend's photo"),
        new Comment("1:2", "Who the hell are you, she is my girlfriend", [
            new Comment("1:2:1", "I am not your girlfriend, who the hell are you creep!!!!")
        ])
    ]),
    new Comment("2", "Nice pic dear!!", [
        new Comment("2:1", "Why are you commenting on my girlfriend's photo"),
        new Comment("2:2", "Who the hell are you, she is my girlfriend", [
            new Comment("2:2:1", "I am not your girlfriend, who the hell are you creep!!!!", [
                new Comment("2:2:1:1", "Why are you commenting on my girlfriend's photo"),
                new Comment("1:2", "Who the hell are you, she is my girlfriend", [
                    new Comment("1:2:1", "I am not your girlfriend, who the hell are you creep!!!!")
                ])
            ])
        ])
    ]),
    new Comment("3", "Nice pic dear!!", [
        new Comment("1:1", "Why are you commenting on my girlfriend's photo"),
        new Comment("1:2", "Who the hell are you, she is my girlfriend", [
            new Comment("1:2:1", "I am not your girlfriend, who the hell are you creep!!!!")
        ])
    ]),
    new Comment("4", "Nice pic dear!!", [
        new Comment("1:1", "Why are you commenting on my girlfriend's photo"),
        new Comment("1:2", "Who the hell are you, she is my girlfriend", [
            new Comment("1:2:1", "I am not your girlfriend, who the hell are you creep!!!!")
        ])
    ])
]

const reRender = () => {
    if (commentsSection) {
        commentsSection.replaceChildren(
            ...comments.map((eachComment,index, arr) =>
                arr[arr.length - 1 - index].getElement())
        )
    }
}
reRender()

const globalInputWrapper = document.getElementById('global-input-container')
const inputReply=globalInputWrapper.querySelector('input')
const btReply=globalInputWrapper.querySelector('button')
btReply.addEventListener('click',(e)=>{
    if(inputReply.value){
        comments.push(new Comment(comments.length+1,inputReply.value,[]))
        inputReply.value = ''
        inputReply.focus()
        reRender()
    }
})