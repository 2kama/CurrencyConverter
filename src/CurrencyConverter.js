import React, { useEffect, useState, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import fx from 'money'
import { getCurrency, getRates } from './actions/'
import './App.css';


const CurrencyConverter = () => {

  const dispatch = useDispatch()

  const currencies = useSelector(state => state.getcurrency.currencies)
  const rates = useSelector(state => state.getcurrency.rates)
  const [baseCurrency, setBaseCurrency] = useState({"code" : "USD", "symbol" : "$"})
  const [baseValue, setBaseValue] = useState(0.00)
  const [equiCurrency, setEquiCurrency] = useState({"code" : "USD", "symbol" : "$"})
  const [equiValue, setEquiValue] = useState(0.00)



  useEffect(() => {
    dispatch(getCurrency())
  }, [dispatch])

  useEffect(() => {
    dispatch(getRates())
  }, [dispatch])


  const focusCursor = e => {
    let temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }


  const convertion = (value, from, to) => {

    fx.rates = rates.rates
    fx.base = rates.base
    
    fx.settings = {
      from,
      to
    }

    setEquiValue(fx.convert(value))
    
  
  }


  const changeSelect = (e, value) => {

    if(rates.rates[e.target.value] === undefined) {

      alert("Selected Conversion Index is Unavialable")

    }else {

      const selection = currencies.filter( ({ code }) => code === e.target.value);

      if(e.target.name === "BaseCurrency") {
          setBaseCurrency({"code" : e.target.value, "symbol" : selection[0].symbol})
          
          let val = value.replace(/\D/g,'');
    
          convertion(Number(val) / 100, e.target.value, equiCurrency.code)

  
      } else {

        setEquiCurrency({"code" : e.target.value, "symbol" : selection[0].symbol})
  
        let val = value.replace(/\D/g,'');
  
        convertion(Number(val) / 100, baseCurrency.code, e.target.value)
      
      }



    }
      
  
  }




  const changeValue = e => {

    let val = e.target.value.replace(/\D/g,'');
    
    setBaseValue(Number(val) / 100)
    
    convertion(Number(val) / 100, baseCurrency.code, equiCurrency.code)

  }





  return (
    <Fragment>

        <div className="base-exchange">
          
            <select 
              name="BaseCurrency" 
              className="baseCurrency" 
              value={baseCurrency.code} 
              onChange={e => changeSelect(e, document.querySelector('.baseValue').value)}
            >
              { 
                  currencies && (
                    currencies.map(cur => (<option key={cur.code} value={cur.code}> {cur.code} </option>))
                  )
                  
              }
            </select>

            <input 
              type="text" 
              className="baseValue" 
              onFocus={(e) => focusCursor(e)} 
              name="baseValue" 
              onChange={(e) => changeValue(e)} 
              value={baseCurrency.symbol + baseValue.toFixed(2)} 
              onFocus={(e) => focusCursor(e)}
            />

            

            <input 
              type="text" 
              name="equiValue" 
              value={equiValue} 
              readOnly 
              value={equiCurrency.symbol + equiValue.toFixed(2)} 
            />


            <select 
              name="EquiCurrency" 
              className="equiCurrency" 
              value={equiCurrency.code} 
              onChange={e => changeSelect(e, document.querySelector('.baseValue').value)}
            >
             { 
                 
                 currencies && (
                   currencies.map(cur => (<option key={cur.code} value={cur.code}> {cur.code} </option>))
                 )
               
              }
            </select>
            
        </div>

       
        
    </Fragment>
  );

}


export default CurrencyConverter;
