const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field){
        this.field = field
        this.y = 0
        this.x = 0
        this.xlimit = field[this.x].length
    }

    print(){
        console.log(`Current Position:${this.y},${this.x}`)
        console.log(this.field.join('.').replaceAll('.','\n').replaceAll(',',''))   
    }

    down_movement(){
        let y = this.y
        let x = this.x

        this.y = y + 1
        if (this.check() === false) this.field[this.y][x] = '*' 
        
    }

    up_movement(){
        let y = this.y
        let x = this.x

        this.y = y - 1
        if (this.check() === false) this.field[this.y][x] = '*' 
        
    }

    left_movement(){
        let y = this.y
        let x = this.x

        if (x > 0){
            this.x = x - 1
            if (this.check() === false) this.field[y][this.x] = '*' 

        } else{
            return ErrorEvent

        }

        
    }

    right_movement(){
        let y = this.y
        let x = this.x

        if (x < this.xlimit - 1){
            this.x = x + 1
            if (this.check() === false) this.field[y][this.x] = '*' 
        } else {
            return ErrorEvent
        }

        
    }

    check(dfield = this.field, x=this.x, y= this.y){

        if (dfield[y][x] === hole){
            return 'YOU LOSE'
        }
        else if (dfield[y][x] === hat){
            return 'YOU WIN'
        } else {
            return false
        }
    }

    generateField(height, width){
        let newField = []
        let options = [hole, fieldCharacter,fieldCharacter, fieldCharacter, fieldCharacter]
        for (let i = 0; i < height; i++) {
            newField.push(new Array)
            for (let j = 0; j < width; j++){
                newField[i][j] = options[Math.floor(Math.random() * options.length)]

            }
             
        }

        //default options
        newField[0][0] = pathCharacter
        newField[height - 1][width - 1] = hat

        this.field = newField
        this.y = 0
        this.x = 0
        this.xlimit = this.field[this.x].length

    }



}

let myField =  new Field([
    ['*', '░', 'O','░', 'O', '░','░', '░', '░'],
    ['░', '░', '░','░', 'O', '░','O', '░', 'O'],
    ['░', 'O', '░','░', '░', '░','░', '^', '░'],
    ]);



function menu(){
    console.log('Welcome to the game')
    let game = true
    while(game){
        myField.print()
        let input = prompt('movement(w a s d): ')
        switch(input){
            case 'w':
                try {
                    myField.up_movement()
                    break
                } catch (error) {
                    console.log('invalid movement, try again')
                    break 
                }
                case 's':
                    try {
                        myField.down_movement()
                        break                    
                    } catch (error) {
                        console.log('invalid movement, try again')
                        break 
                    }
            case 'a':
                try {
                    myField.left_movement()
                    break
                } catch (error) {
                    console.log('invalid movement, try again')
                    break 
                }
            case 'd':
                try {
                    myField.right_movement()
                    break
                } catch (error) {
                    console.log('invalid movement, try again')
                    break 
                }

        }
        let result = myField.check()

            if (result === 'YOU LOSE'){
                console.log('GAME OVER')
                game = false
            }
            if (result === 'YOU WIN'){
                console.log('CONGRATULATIONS')
                game = false
                const selection = prompt('customize the game yes/no: ')
                if(selection ==='yes'){
                    const height = prompt('Game Height: ')
                    const width = prompt('Game Width: ')
                    myField.generateField(height, width)
                    menu()
                } else {
                    console.log('Thanks for playing')
                    break
                }
            }
    }
}

menu()