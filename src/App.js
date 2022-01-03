import logo from './logo.svg';
import {useState} from 'react';
//import './App.css';
import ListJob from './ListJob'
import './style.css';

function App() {

  const [job, setJob] = useState('');
  const [listJob, setListJob] = useState(()=>{
      let initJob = JSON.parse(localStorage.getItem('listJob'));
      return initJob ?? [];
  });

  const addJob = ()=>{
      if(job != ''){
          setListJob(prev =>{
              let newList = [...prev,job];
              localStorage.setItem('listJob',JSON.stringify(newList));
              return newList;
          });
          setJob({content:''});
      }
  }

  const removeJob = (e, index)=>{
      e.stopPropagation();
      setListJob(prev =>{
          let newList = [...prev];
          newList.splice(index,1)
          localStorage.setItem('listJob',JSON.stringify(newList));
          return newList;
      });
  }

  const handleFinish = (e, index)=>{
      e.stopPropagation();
      setListJob(prev =>{
        let newList = [...prev];
        if(newList[index].isFinish === 'false'){
          newList[index].isFinish = 'true';
        }
        else if(newList[index].isFinish === 'true'){
          newList[index].isFinish = 'false';
        }
        localStorage.setItem('listJob',JSON.stringify(newList));
        return newList;
    });
  }

  return (
    <div className="App">
        <div className='main'>
            <div className='form-input'>
                <input 
                  className='job-input' 
                  type='text'
                  placeholder='Enter New Task'
                  value={job.content} 
                  onChange={e => setJob({'content':e.target.value, 'isFinish':'false'})} 
                >
                </input>
                <button className='add-btn' onClick={addJob}>Add</button>
            </div>

            <ListJob className='list-job' listJob={listJob}>
                {
                  listJob.map((job, index) =>{
                      return (
                          <li key={index} className={job.isFinish != 'false' ? 'finish': null} 
                            onClick={(e) => {handleFinish(e,index)}}>
                            <p>{job.content}</p>
                            <i onClick={(e) => removeJob(e,index)} className='bx bx-trash'></i>
                          </li>
                      )
                  })
                }
            </ListJob>
        </div>
        
    </div>
  );
}

export default App;
