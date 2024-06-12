import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB91alPQai52WFAq44Tw4w4owTFOu9zWIE",
    authDomain: "todo-list-3c41f.firebaseapp.com",
    projectId: "todo-list-3c41f",
    storageBucket: "todo-list-3c41f.appspot.com",
    messagingSenderId: "426111709664",
    appId: "1:426111709664:web:8876ae5349c80ea0933b85",
    measurementId: "G-4GTNW6W5RN"
};


// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let prevDate = year + '.' + month + '.' + date;

$(function () {
    let todayDate = year + '.' + month + '.' + date;

    function updateDateSpan() {
        year = today.getFullYear();
        month = today.getMonth() + 1;
        date = today.getDate();
        todayDate = year + '.' + month + '.' + date;
        $('#date-span').text(todayDate);
        prevDate = todayDate;
    }

    updateDateSpan();
    fetchTodo();

    $('#arrowleft').click(function () {
        today.setDate(today.getDate() - 1);
        updateDateSpan();
        fetchTodo();
    });

    $('#arrowright').click(function () {
        today.setDate(today.getDate() + 1);
        updateDateSpan();
        fetchTodo();
    });
});

$("#addbtn").click(async function () {
    let todoContent = $('#todo-content').val();

    let doc = {
        'todoContent': todoContent
    };
    await addDoc(collection(db, "todo-" + prevDate), doc);
    alert('저장 완료');
    fetchTodo();
});

async function fetchTodo() {
    $('#todo-list').empty();

    let docs = await getDocs(collection(db, "todo-" + prevDate));
    docs.forEach((doc) => {
        let row = doc.data();
        console.log(row);

        let todoContent = row['todoContent'];

        let temp_html = `
        <div class="list">
            <span id="todo-value">${todoContent}</span>
            <div id="checkbtn" class="checkbtn">
                <div class="checkicon"></div>
            </div>
        </div>`;
        $('#todo-list').append(temp_html);
    });
}

async function fetchDone() {
    let $temp_html = $(temp_html);

    $temp_html.find('#checkbtn').click(async function () {
        let doneContent = $('#todo-value').val();

        let doc = {
            'doneContent': doneContent
        };
        await addDoc(collection(db, "done-" + prevDate), doc);
        alert('todo 완료');

        let docs = await getDocs(collection(db, "done-" + prevDate));
        docs.forEach((doc) => {
            let row = doc.data();

            $('#done-list').append($temp_html);
        })
    })
}
