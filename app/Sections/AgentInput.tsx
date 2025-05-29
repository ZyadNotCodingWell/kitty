import React from 'react';

const AgentInput: React.FC = () => {
  return (
		<div className='bg-gradient-to-br from to-blue-400 to bg-fuchsia-400 p-0.5 w-full rounded-lg mx-2'>
    	<div className='flex items-center w-full'>
    	  <input
    	    type="text"
    	    placeholder="Chat with our AI agent..."
    	    className='w-full px-10 py-2 text-lg bg-neutral-950 text-neutral-300/70 border border-neutral-300/15 rounded-md focus-within:outline-0'
					/>
    	</div>
		</div>
  );
};

export default AgentInput;
