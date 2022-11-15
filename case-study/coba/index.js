const arr = [
    {
        id : 1,
        name : 'note pertama'
    },
    {
        id: 2,
        name : 'note kedua'
    }
]

const result = arr.find(note => note.id == 2)
const result1 = arr.findIndex(note => note.id == 3)

if(result) console.log(result)
else console.log('Not Found')

console.log(result1)