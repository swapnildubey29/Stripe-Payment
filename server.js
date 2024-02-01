require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static("public"))

const stripe = require('stripe')(process.env.
    STRIP_PRIVATE_KEY)

     const storeItems = new Map([
        [1, {priceInCents: 10000, name: "Learn DSA"}],
        [2, {priceInCents: 20000, name: "Learn DBMS"}],
     ])
     
     app.post("/create-checkout-session", async(req,res) =>{
         try{
          const session = await  stripe.checkout.session.create({
                  payment_method_types: ['card'],
                  mode: 'payment',
                  line_items: req.body.items.map(item =>{
                    const showItem = store.Items.get(item.id)
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: storeItems.name
                            },
                            unit_amount: storeItems.priceInCents,
                        },
                        quantity: item.quantity
                    }
                  }),
                  success_url: `${process.env.SERVER_URL}/success.html`,
                  success_url: `${process.env.SERVER_URL}/cancle.html`
            })
            res.json({url: session.url})
         }catch(e){
               res.status(500).json({error: e.message})
         }
     })

app.listen(3000)