import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../baseUl'
const OfferLetter = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const annualCTCInput=useRef(null)
    const [annualCTC, setAnnualCTC] = useState("")
    useEffect(() => {
        axios.get(`${baseUrl}/applicant/id/${id}`).then(res => setData(res.data)).catch(err => console.log(err.message))
    }, [id])
    ////calculations for generate offer letter :
    const calculations = () => {
        var date = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        date = `${day} ${month} ${year}`;
        const a_total_B = annualCTC;
        const a_cc_pf = 21600;
        const a_total_A = parseInt(a_total_B) - parseInt(a_cc_pf);
        const a_basic = Math.round(a_total_A * 0.4);
        const a_hra = Math.round(a_basic * 0.5);
        const a_sa = Math.round(a_total_A * 0.3);
        const a_con = Math.round(a_total_A * 0.1);
        const a_fb = 0;
        const a_YEB = 0;
        const a_PB = 0;
        const a_VarP = 0;
        const a_total_C = a_YEB + a_PB + a_VarP;
        const a_EmployerPF = 21600;
        const a_ComPF = 21600;
        const a_Medical = 3228;
        const a_PT = 2400;
        const a_TDS = 0;
        const a_total_CTC = parseInt(a_total_B) + parseInt(a_total_C);
        const a_GP = a_total_CTC - a_EmployerPF - a_Medical - a_PT - a_ComPF;
        const name = data.name;
        // const date = "August 7 2023";
        const role = data.role;
        const location = "Bengalore";
        const ref = "sibay:****";
        const salary = "(Indian Rupees Only)";

        const m_basic = Math.round(a_basic / 12);
        const m_hra = Math.round(a_hra / 12);
        const m_sa = Math.round(a_sa / 12);
        const m_con = Math.round(a_con / 12);
        const m_total_A = Math.round(a_total_A / 12);
        const m_fb = Math.round(a_fb / 12);
        const m_cc_pf = Math.round(a_cc_pf / 12);
        const m_total_B = Math.round(a_total_B / 12);
        const m_YEB = Math.round(a_YEB / 12);
        const m_PB = Math.round(a_PB / 12);
        const m_VarP = Math.round(a_VarP / 12);
        const m_total_C = Math.round(a_total_C / 12);
        const m_EmployerPF = Math.round(a_EmployerPF / 12);
        const m_ComPF = Math.round(a_ComPF / 12);
        const m_Medical = Math.round(a_Medical / 12);
        const m_PT = Math.round(a_PT / 12);
        const m_TDS = Math.round(a_TDS / 12);
        const m_GP = Math.round(a_GP / 12);
        const m_total_CTC = Math.round(a_total_CTC / 12);

        return {
            a_total_B,
            a_cc_pf,
            a_total_A,
            a_basic,
            a_hra,
            a_sa,
            a_con,
            a_fb,
            a_YEB,
            a_PB,
            a_VarP,
            a_total_C,
            a_EmployerPF,
            a_ComPF,
            a_Medical,
            a_PT,
            a_TDS,
            a_total_CTC,
            a_GP,
            name,
            date,
            role,
            location,
            ref,
            salary,
            m_basic,
            m_hra,
            m_sa,
            m_con,
            m_total_A,
            m_fb,
            m_cc_pf,
            m_total_B,
            m_YEB,
            m_PB,
            m_VarP,
            m_total_C,
            m_EmployerPF,
            m_ComPF,
            m_Medical,
            m_PT,
            m_TDS,
            m_GP,
            m_total_CTC
        };
    };
    //download the offerletter 

    const downloadAnnexure = async (e) => {
        e.preventDefault()
            if(annualCTC > 0 ){
            const requestData = await calculations()
            const message = `Would you like to download the file?`;
            const result = window.confirm(message);
            if (result) {
                // The user clicked "OK"
                const response = await axios.get('http://localhost:9005/annexure', {
                    params: requestData, // Pass the request data as URL parameters
                    responseType: 'blob', // Set the response type to 'blob' to handle binary data
                });
    
                // Create a URL for the blob
                const url = URL.createObjectURL(response.data);
    
                // Create a temporary link and click it programmatically to initiate the download
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'output.docx'); // Set the desired file name and extension
                document.body.appendChild(link);
                link.click();
    
                // Clean up the URL and remove the temporary link
                URL.revokeObjectURL(url);
                document.body.removeChild(link);
            } else {
                // The user clicked "Cancel"
                return;
            }
            }else{
                alert("Please Enter Annual CTC")
                annualCTCInput.current.focus()
            }
    }
    // console.log(data)
    const Percentage = ["10%", "20%", "30%", "40%", "50%"]
    //Have to work on represant in english wor
    // const [wordRepresentation, setWordRepresentation] = useState('');
    // const handleInputChange = (event) => {
    //     setAnnualCTC(event.target.value)
    //     // Convert input number to words
    //     const words = convertToWords(Number(event.target.value));
    //     setWordRepresentation(` ${words}`);
    // };
    //htmlFor is work id
    ///Set the data for Offer letter
    const handleOfferLetterDate=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    return (
        <div className='container border border-2 rounded bg-light'>
            <h3 className='text-center mt-2 mb-2'>Annexure Form</h3>
            {
                Object.keys(data).length > 0 ? <div className='m-4'>
                    <form className='width' onSubmit={downloadAnnexure}>
                        <div className="row">
                            {/* First Name Field */}
                            <div className="mb-3 col-sm-6">
                                <label htmlFor='firstName' className="form-label">Name:</label>
                                <input className='form-control' id="firstName" value={data?.name} onChange={ handleOfferLetterDate} name="name" type="text" />
                                {/* {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null} */}
                            </div>

                            {/* Email Field */}
                            <div className="mb-3 col-sm-6">
                                <label htmlFor='email' className="form-label">Designation:</label>
                                <input className='form-control' id="email"  value={data?.role} onChange={ handleOfferLetterDate} name="role" type="text" />
                                {/* {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null} */}
                            </div>
                        </div>
                        <div className="row">
                            

                            {/* Email Field */}
                            <div className="mb-3 col-sm-6">
                                <label htmlFor='email' className="form-label">Annual CTC:</label>
                                <input
                                    ref={annualCTCInput}
                                    type="number"
                                    className='form-control'
                                    placeholder="Enter a salary (i.e 360000 if 3.6LPA): 360000"
                                    value={annualCTC}
                                    onChange={e => setAnnualCTC(parseInt(e.target.value))}
                                />
                                
                                {/* {
                                    annualCTC >0 &&<div>
                                        <p className='text-success p-2'>{wordRepresentation}</p>
                                    </div>
                                } */}
                                {/* {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null} */}
                            </div>
                            {/* First Name Field */}
                            <div className="mb-3 col-sm-6">
                                <label htmlFor='firstName' className="form-label">Location:</label>
                                <input className='form-control' value="Bangalore" readOnly/>

                                {/* {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null} */}
                            </div>
                        </div>

                        {/* Additional fields in one row */}
                        <div className="row">
                            {/* Field 1 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field1' className="form-label">Company PF(Yearly)</label>
                                <input className='form-control' readOnly defaultValue="21600" type='text' />
                            </div>

                            {/* Field 2 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field2' className="form-label">Professional Tax(Yearly)</label>
                                <input className='form-control' readOnly defaultValue="2400" type='text' />
                            </div>

                            {/* Field 3 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field3' className="form-label">Employee PF(Yearly)</label>
                                <input className='form-control' readOnly defaultValue="21600" type='text' />
                            </div>

                            {/* Field 4 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field4' className="form-label">Medical Insurance (Yearly):</label>
                                {/* <select readOnly className='form-select'>
                                    <option>3226 (Age:19-35)</option>
                                    <option>3563(Age:36-45)</option>
                                </select> */}
                                <input className='form-control' value="3226 (Age:19-35)" readOnly/>
                            </div>
                        </div>

                        {/* Percentages  */}
                        <div className="row">
                            {/* Field 1 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field1' className="form-label">Basic Percentage:</label>
                                <input className='form-control' readOnly defaultValue={Percentage[3]} type='text' />
                            </div>

                            {/* Field 2 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field2' className="form-label">HRA % (50% of Basic):</label>
                                <input className='form-control' readOnly defaultValue={Percentage[4]} type='text' />
                            </div>

                            {/* Field 3 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field3' className="form-label">Special Allowances %:</label>
                                <input className='form-control' readOnly defaultValue={Percentage[2]} type='text' />
                            </div>

                            {/* Field 4 */}
                            <div className="mb-3 col-sm-3">
                                <label htmlFor='field4' className="form-label">Conveyance %:</label>
                                <input className='form-control' readOnly defaultValue={Percentage[0]} type='text' />
                            </div>
                        </div>
                        <div className="row">

                            {/* Email Field */}
                            <div className="mb-3 col-sm-6">
                                <button onClick={downloadAnnexure} className='btn btn-primary'><i className="fa fa-download p-2" ></i>Download Offer Letter</button>
                                {/* {errors.commentBy ? <p className='text-danger'>{errors.commentBy}</p> : null} */}
                            </div>
                        </div>

                    </form>
                </div> : <p>Please wait...</p>
            }

        </div>
    )
}

export default OfferLetter


