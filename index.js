const tb = document.getElementById("tb");
tb.style.backgroundColor = "rgb(90, 90, 90)";
tb.style.color = "lightgray";
tb.style.textAlign = "center"
// const h=`<h1> Student Registration Form</h1>`;

let arr = JSON.parse(localStorage.getItem("studentRegInfo")) || [];
renderDetails(arr);
function add() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const reg = document.getElementById("reg").value;
    const sec = document.getElementById("sec").value;
    const program = document.getElementById("program").value;

    if (!fname || !lname || !reg || !sec || !program) {
        alert("please input data!!!");
        return;
    }
    const studentReg = {
        f_name: fname,
        l_name: lname,
        s_reg: reg,
        s_sec: sec,
        s_pro: program
    }
    arr.push(studentReg);
    console.log(arr);

    localStorage.setItem("studentRegInfo",JSON.stringify(arr));
   

    renderDetails(arr);

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("reg").value = "";
    document.getElementById("sec").value = "";
    document.getElementById("program").value = "";

    document.body.style.backgroundColor = "lightgray";

}

// const tb = document.getElementById("tb");

function renderDetails(arr) {
    const tb = document.getElementById("tb");
    tb.innerHTML = "";
    arr.forEach(osama => {
        const tr = document.createElement("tr");

        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");

        td.innerHTML = osama.f_name;
        td1.innerHTML = osama.l_name;
        td2.innerHTML = osama.s_reg;
        td3.innerHTML = osama.s_sec;
        td4.innerHTML = osama.s_pro;

        tb.appendChild(tr);
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);


        const update = document.createElement("button");
        const del = document.createElement("button");
        update.innerHTML = "Edit";
        del.innerHTML = "Delete";

        tr.appendChild(td5);
        td5.appendChild(update);
        td5.appendChild(del);


        update.style.backgroundColor = "green";
        update.style.margin="5px";
        update.style.fontSize="20px";
        del.style.backgroundColor = "red";
        del.style.margin="5px"
        del.style.fontSize="20px";


        update.style.color = "lightgray";
        del.style.color = "lightgray";

        del.addEventListener("click", function () {
            // const index = arr[i];
            const index = Array.from(tr.parentNode.children).indexOf(tr);
            arr.splice(index, 1);
            tb.removeChild(tr);
            localStorage.removeItem("studentRegInfo");
            localStorage.setItem("studentRegInfo",JSON.stringify(arr));
            console.log(arr);
        });



        update.addEventListener("click", function () {
            const finp = document.getElementById("fname");
            const linp = document.getElementById("lname");
            const rinp = document.getElementById("reg");
            const sinp = document.getElementById("sec");
            const pinp = document.getElementById("program");

            finp.value = td.textContent;
            linp.value = td1.textContent;
            rinp.value = td2.textContent;
            sinp.value = td3.textContent;
            pinp.value = td4.textContent;

            const saveBtn = document.createElement("button");
            saveBtn.innerHTML = "SaveEdit";
            tr.appendChild(saveBtn);
            saveBtn.style.backgroundColor="blue";
            saveBtn.style.fontSize="20px";
            saveBtn.style.margin="5px";

            saveBtn.addEventListener("click", function () {
                td.textContent = finp.value;
                td1.textContent = linp.value;
                td2.textContent = rinp.value;
                td3.textContent = sinp.value;
                td4.textContent = pinp.value;

                const index = Array.from(tr.parentNode.children).indexOf(tr);
                arr[index].f_name = td.textContent;
                arr[index].l_name = td1.textContent;
                arr[index].s_reg = td2.textContent;
                arr[index].s_sec = td3.textContent;
                arr[index].s_pro = td4.textContent;


                localStorage.setItem("studentRegInfo",JSON.stringify(arr));
                console.log(arr);
                tr.removeChild(saveBtn);

                document.getElementById("fname").value = "";
                document.getElementById("lname").value = "";
                document.getElementById("reg").value = "";
                document.getElementById("sec").value = "";
                document.getElementById("program").value = "";
            });
        });



    });


}

const search = document.getElementById("search");

search.addEventListener("input", function () {
    const newSearch = search.value.toLowerCase();
    const filteredNames = arr.filter(students =>
        students.f_name.toLowerCase().includes(newSearch) ||
        students.l_name.toLowerCase().includes(newSearch) ||
        students.s_reg.toLowerCase().includes(newSearch) ||
        students.s_sec.toLowerCase().includes(newSearch) ||
        students.s_pro.toLowerCase().includes(newSearch)
    )
    console.log(filteredNames);
    renderDetails(filteredNames);
});
