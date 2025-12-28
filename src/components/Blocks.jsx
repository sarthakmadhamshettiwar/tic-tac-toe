// No, this is not the correct way to pass props in a React component.
// The correct way is to use an object as the argument, typically called "props" or by destructuring the named props you expect.

function Block({ value, onClick}) {
    console.log(value, onClick, 'block');
    return (
        <div className="block" onClick={onClick}>
            {value}
        </div>
    );
}


export default Block;