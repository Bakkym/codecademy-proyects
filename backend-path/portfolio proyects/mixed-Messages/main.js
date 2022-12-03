// Astrology quotes

const firstArray= ['I have been criticized and ridiculed for turning to astrology, ', '20th-century totalitarian movements were no more defined by a rejection of Judeo-Christianity than they were defined by a rejection of astrology, ', 'Human nature is complex. Even if we do have inclinations toward violence, ' ]
const secondArray = ['but after a while, ', 'alchemy, Confucianism, Scientology, ', 'we also have inclination to empathy, ']
const lastArray = ["I reached the point where I didn't care.", 'or any of hundreds of other belief systems.', 'to cooperation, to self-control.']

class MixedMessage {
    constructor(first, second, last){
        this.first = first
        this.second = second
        this.last = last
    }

    generateMessage(){
        const firstPart = this.first[Math.floor(Math.random()* this.first.length)]
        const secondPart = this.second[Math.floor(Math.random()* this.second.length)]
        const lastPart = this.last[Math.floor(Math.random()* this.last.length)]

        return firstPart + secondPart + lastPart
    }
}

const message = new MixedMessage(firstArray, secondArray, lastArray)

console.log(message.generateMessage())
 


