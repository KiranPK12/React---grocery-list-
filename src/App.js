import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name,setName]=useState('');
  const [ list,setList ] = useState([]);
  const [ isEditing,setIsEditing ] = useState(false);
  const [ editId,setEditId ] = useState(null);
  const [alert,setAlert]=useState({show:false,msg:'',type:''});
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!name){
      // display alert
      showAlert(true,'Please enter a value','danger')
    }else if(name && isEditing){
      setList(
        list.map((item)=>{
          if(item.id === editId){
            return {...item,title:name}
          }
          return item
        })
      )
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,'value changed','success')
      // soon
    }else{
      // show alert
      const newItem = {id: new Date().getTime().toString(),title:name};
      setList([...list,newItem]);
      setName('');
      showAlert(true,'Item added','success')
      console.log(list,name);
    }
  }

  const showAlert = (show=false,msg='',type='')=>{
    setAlert({show,msg,type})
  }

  const clearList = ()=>{
    showAlert(true,'Empty List','danger');
    setList([]);
  }

  const removeItem = (id)=>{
    showAlert(true,'Item removed','danger')
    setList(list.filter((item)=> item.id !== id))
  }

  const editItem = (id)=>{
    const specificItem = list.find((item)=>item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  return (
    <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>Grocery bud</h3>
      <div className="form-control">
        <input type="text" className='grocery' placeholder='e.g. eggs' value={name} onChange={(e)=>setName(e.target.value)}/>
        <button className='submit-btn' type='submit'>
          {isEditing ? 'edit':'submit'}
        </button>
      </div>
    </form>
      {list.length>0 &&(<div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={clearList}>Clear Items</button>
      </div>)}
    </section>
  )
  

  
}

export default App
