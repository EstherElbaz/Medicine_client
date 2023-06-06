


export default function MyMedicines (){

    const getMedicinesForUser = (userId) => {
        console.log(userId);
        console.log(user);

    }


    //כרגע נשלוף את היוזר מהסטורג',כדי שיהיה בקומפוננטה
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    getMedicinesForUser(user.id);
    


//נלבדוק מתי מתרחשת קריאה מאיפיאי

return (
    <div>
        <h1>רשימת התרופות למשתמש</h1>
    </div>
)


}