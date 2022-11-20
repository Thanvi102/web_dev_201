let tod = new Date();
let dd = tod.getDate();
let mm = tod.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
let yyyy = tod.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
maxDate = yyyy - 18 + '-' + mm + '-' + dd;
minDate = yyyy - 55 + '-' + mm + '-' + dd;
document.getElementById("dob").setAttribute("min", minDate);
document.getElementById("dob").setAttribute("max", maxDate);

let userEntries = localStorage.getItem("user-entries");
if (userEntries) {
    userEntries = JSON.parse(userEntries);
} else {
    userEntries = [];
}

const displayEntries = () => {
    const savedUserEntries = localStorage.getItem("user-entries");
    let entries = "";
    if (savedUserEntries) {
        const parsedUserEntries = JSON.parse(savedUserEntries);
        entries = parsedUserEntries
            .map((entry) => {
                const name = `<td class='border px-4 py-2'>${entry.name}</td>`;
                const email = `<td class='border px-4 py-2'>${entry.email}</td>`;
                const password = `<td class='border px-4 py-2'>${entry.password}</td>`;
                const dob = `<td class='border px-4 py-2'>${entry.dob}</td>`;
                const acceptTerms = `<td class='border px-4 py-2'>${entry.acceptTermsAndConditions}</td>`;
                const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
                return row;
            })
            .join("\n");
    }
    var table = `<table class="table-auto w-full"><tr>
  <th class="px-4 py-2">Name</th>
  <th class="px-4 py-2">Email</th>
  <th class="px-4 py-2">Password</th>
  <th class="px-4 py-2">Dob</th>
  <th class="px-4 py-2">Accepted terms?</th>
</tr>${entries} </table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTermsAndConditions =
        document.getElementById("acceptTerms").checked;
    const userDetails = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions,
    };
    userEntries.push(userDetails);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    displayEntries(); // Add this line
};

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();
