import { useEffect, useState } from "react"

export function ContactFilter(props) {

    const [filterBy, setFilterBy] = useState(props.filterBy)


    useEffect(() => {
        props.onChangeFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [field]: value
        }))



    }

    const { name } = filterBy
    return (
        <form className='contact-filter'>
            <div className="filter-wrapper">
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" placeholder="Search" />
            </div>
        </form>
    )
}
