import React, {useState} from 'react';

function ReportUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState("");

    const handleReportButtonClick = () => {
        setIsOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted comment: ", comment);
        setIsOpen(false);
        setComment("");
    };

    return (
        <>
        <button onClick={handleReportButtonClick}> Report & Block User</button>
        {isOpen && (
            <div className="report-form">
                <form onSumbit = {handleSubmit}>
                    <label htmlFor="commentOnReport">Comment on report:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )}
        </>
    );
}

export default ReportUser;

