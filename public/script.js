const messForm = document.getElementById('messForm');
const showBtn = document.getElementById('showBtn');
const tableBody = document.getElementById('messTableBody');

// 1. Save Button Logic
messForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messData = {
        date: document.getElementById('date').value,
        day: document.getElementById('day').value,
        lunch: parseInt(document.getElementById('lunch').value),
        dinner: parseInt(document.getElementById('dinner').value),
        others: document.getElementById('others').value
    };

    try {
        const response = await fetch('/api/mess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            messForm.reset();
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error saving data:', error);
        alert('Server connect nahi ho pa raha hai.');
    }
});

// 2. Show Button Logic
showBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/mess');
        const data = await response.json();

        if (response.ok) {
            tableBody.innerHTML = ''; // Purana data clear karne ke liye
            
            if(data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No records found</td></tr>`;
                return;
            }

            data.forEach(mess => {
                const row = `
                    <tr>
                        <td>${mess.id}</td>
                        <td>${mess.date}</td>
                        <td>${mess.day}</td>
                        <td>${mess.lunch}</td>
                        <td>${mess.dinner}</td>
                        <td>${mess.others}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } else {
            alert('Error fetching data: ' + data.error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Server se data fetch nahi ho paya.');
    }
});
