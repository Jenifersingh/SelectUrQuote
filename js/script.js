//Get Quote API

const quote = document.getElementById('quote')
const author = document.getElementById('author')
const newQuote = document.getElementById('new-quote')
const twitter = document.getElementById('twitter')
const loader = document.getElementById('loader')
const qContainer = document.querySelector('.quote-container')

// console.log(quote)

// var data;



function loading(){
    loader.hidden = false
    qContainer.hidden = true
}

function complete(){
    if(!loader.hidden){
        qContainer.hidden = false
        loader.hidden = true
    }
}


async function getQuote(){

    loading()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        // console.log(quote)
        // console.log(data)
        quote.innerText = data.quoteText

        if(data.quoteAuthor === ""){
            author.innerText = "- Unknown"
        }
        else {
            author.innerText = '- '+data.quoteAuthor
        }

        complete()
    }

    catch {(error)=>{
        getQuote()
        console.log('Its me the error ---- ', error)
    }
    }
};

function tweetQuote(){
    const quoteText = quote.innerText
    const authorText = author.innerText
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText}-${authorText}`
    window.open(tweetUrl, '_blank')
}


// Event Listeners
newQuote.addEventListener('click', ()=>{
    getQuote()

})

twitter.addEventListener('click', tweetQuote)


getQuote()
// console.log(data)
