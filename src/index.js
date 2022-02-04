const url= "https://platzi-avo.vercel.app"
const appNode=document.querySelector('#app')
//Delegacion de eventos (el padre #app es el que escucha todo)
appNode.addEventListener('click',(evento)=>{
    if(evento.target.nodeName==='H2'){
        window.alert('Se ha dado un click en un h2')
    }
})

//internacionalicación moneda
const formatPrice=price=>{
    const newPrice= new window.Intl.NumberFormat('es-ES',{
        style: 'currency',
        currency:'USD'}).format(price)
        return newPrice
    }

//web api
async function fetchData() {
    //Conectarse al servidor
    const response = await fetch(`${url}/api/avo`),
    //convertir la respuesta a JSON
    datos = await response.json(),
    //crear un array vacio para llenarlo
    allItems = [];
  
    datos.data.forEach(item => {
        //create image
        const image= document.createElement('img')
        //url de la imagen
        image.src=`${url}${item.image}`
        image.className='h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'
        //crear titulo
        const title=document.createElement('h2')
        title.textContent=item.name
        title.className='text-lg'
        //crear precio
        const price=document.createElement('div')
        price.textContent=formatPrice(item.price)
        price.className='text-gray-600'

        //Wrap price and title
        const priceAndTitle=document.createElement('div')
        priceAndTitle.className='text-center md:text-left'
        priceAndTitle.append(title,price)

        //Wrap image and priceAndTitle
        const card=document.createElement('div')
        card.className='md:flex bg-white border-solid border-2 border-green-700 rounded-lg p-6 hover:bg-gray-300'
        card.append(image,priceAndTitle)

        const container=document.createElement('div')
        container.append(card)
        allItems.push(container)
    });
    appNode.append(...allItems)
    appNode.className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'
}
fetchData()