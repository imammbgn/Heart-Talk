const apiUrl = '/.netlify/functions/post-question/post-question'

function submitData(event) {
    event.preventDefault();

    const questionInput = document.getElementById('input').value;
    const keyInput = document.getElementById('key').value;
    
    if (keyInput !== 'Kotelzzz') {
        alert("saha lu??")
        document.getElementById('input').value = '';
        document.getElementById('key').value = '';
    }

    else {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: questionInput
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Menampilkan data yang baru ditambahkan
            alert('Pertanyaan berhasil ditambahkan!');
            document.getElementById('input').value = ''; // Mengosongkan input setelah submit
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Gagal menambahkan pertanyaan. Silakan coba lagi.');
        });
    }
}