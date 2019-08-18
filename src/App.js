import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


function App(props) {
  useEffect(()=>{
    fetchData()
  }, [props.pluginsData])

  function fetchData(){
    let pluginsData =  []
    pluginsData = props.pluginsData;

    if(pluginsData){
                let new_data = pluginsData
                if(new_data &&  new_data.length){ //from props
                  setPageUrl(new_data)  
                }
            }
  }
 
  const [inputUrl,setInputUrl] = useState('')
  const [show,setShow] = useState(false)
  const [pageUrl,setPageUrl] = useState('')

 function handleChange(e) {
   setInputUrl(e.target.value)
   setPageUrl(e.target.value)
   setShow(false)
 }

 function handleSubmitNull(){
   alert('Enter URL')
 }

 function handleSubmit() {
    var validUrl = require('valid-url');
    
    if (validUrl.isUri(pageUrl)){
      props.updateDb(pageUrl).then(res=>{
        setShow(true)
        alert(res)
      }).catch(err=>{
        alert(err)
      })
    }
    else {
        alert('Not a Valid URL');
    }
  }

  return (
          <div>
            {props.mentor ?
              <div>
                <div className='mt-xxs p-s text-center upload-plugin averta-light'>
                  <input className='mt-s m-xxs p-s text-input averta-light' placeholder='URL' value={inputUrl}  onChange={handleChange}/>
                  <div id='btn-cont' className='mt-m mb-l'>
                    {
                      inputUrl && inputUrl.length ?
                      <div className='cursor publish mt-m' onClick={()=>handleSubmit()}>Submit</div>
                      :
                      <div className='cursor publish-null mt-m' onClick={()=>handleSubmitNull()}>Submit</div>
                    }
                    
                  </div>
                </div>
                { show ?
                    <div className='mt-xxs p-s text-center upload-plugin averta-light'>
                      <iframe  src={pageUrl} title={pageUrl} style={{minHeight:'57vh',width:'90%', border: '2px solid gray'}}>
                        {pageUrl}
                      </iframe>
                    </div>:
                    null
                }
              </div>:
              <div className='mt-xxs p-s text-center upload-plugin averta-light'>
                <iframe src={pageUrl} style={{height:'92vh',width:'90%',marginTop:'10px', border: '2px solid gray'}}>{pageUrl}</iframe>
              </div>
            }
          </div>
  );
}

export default App;
