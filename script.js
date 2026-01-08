document.addEventListener('DOMContentLoaded', function () {
    const authLink = document.getElementById('auth-link');
    const loggedInUser = localStorage.getItem('loggedInUser');
  
    if (authLink) {
      if (loggedInUser) {
        authLink.innerHTML = '<img src="https://img.icons8.com/ios-filled/20/ffffff/exit.png" alt="Logout Icon" />';
        authLink.href = "#";
        authLink.title = "Logout";
        authLink.addEventListener("click", function (e) {
          e.preventDefault();
          localStorage.removeItem("loggedInUser");
          alert("You have been logged out!");
          window.location.reload();
        });
      } else {
        authLink.innerHTML = '<img src="https://img.icons8.com/ios-filled/20/ffffff/user-male-circle.png" alt="User Icon" />';
        authLink.href = "register.html";
        authLink.title = "Login / Register";
      }
    }
  
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
  
    if (toggleSidebarBtn && sidebar && mainContent) {
      toggleSidebarBtn.addEventListener('click', function () {
        if (sidebar.style.left === '0px') {
          sidebar.style.left = '-250px';
          mainContent.style.marginLeft = '0';
        } else {
          sidebar.style.left = '0px';
          mainContent.style.marginLeft = '250px';
        }
      });
    }
  
    const bookBtn = document.getElementById('book-appointment-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!loggedInUser) {
          alert("Please login to book an appointment!");
          window.location.href = "login.html";
        } else {
          window.location.href = "appointment.html";
        }
      });
    }
  
    // Appointment History
    const historyList = document.getElementById('history-list');
    if (historyList) {
      if (!loggedInUser) {
        historyList.innerHTML = "<p>Please login to view your appointment history.</p>";
      } else {
        const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const userAppointments = allAppointments.filter(app => app.email === loggedInUser);
  
        if (userAppointments.length === 0) {
            historyList.innerHTML = "<p>No appointments found!</p>";
          } else {
            let listHTML = "<ul>";
            userAppointments.forEach(app => {
              listHTML += `<li>📅 <strong>${app.date}</strong> in <strong>${app.department}</strong> department with <strong>${app.name}</strong></li>`;
            });
            listHTML += "</ul>";
            historyList.innerHTML = listHTML;
          }
          
      }
    }
  });
  function openModal() {
    document.getElementById("contactModal").style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("contactModal").style.display = "none";
  }
  
  // Optional: Close modal if user clicks outside it
  window.onclick = function(event) {
    const modal = document.getElementById("contactModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  document.getElementById("subscribe-btn").addEventListener("click", function () {
    const email = document.getElementById("subscriber-email").value.trim();
  
    if (validateEmail(email)) {
      alert(`Thanks for subscribing, ${email}!`);
      document.getElementById("subscriber-email").value = ""; // clear input
    } else {
      alert("Please enter a valid email address.");
    }
  });
  
  function validateEmail(email) {
    // Basic email pattern check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  function showDoctorProfile(doctor) {
    const profiles = {
      maran: {
        name: "Dr. Maran",
        specialty: "Cardiologist",
        experience: "10+ years in treating cardiovascular diseases",
        bio: "Dr. Maran is a senior cardiologist known for innovative heart treatments and compassionate patient care."
      },
      suganthi: {
        name: "Dr. Suganthi",
        specialty: "Pediatrician",
        experience: "8 years of experience in child healthcare",
        bio: "Dr. Suganthi specializes in child health, immunization, and developmental monitoring."
      },
      john: {
        name: "Dr. JohnDurai",
        specialty: "Psychiatrist",
        experience: "12 years in mental health care",
        bio: "Dr. JohnDurai is dedicated to improving mental wellness through therapy and counseling."
      }
    };
  
    const doc = profiles[doctor];
    if (doc) {
      document.getElementById("doctorDetails").innerHTML = `
        <h2>${doc.name}</h2>
        <p><strong>Specialty:</strong> ${doc.specialty}</p>
        <p><strong>Experience:</strong> ${doc.experience}</p>
        <p>${doc.bio}</p>
      `;
      document.getElementById("doctorModal").style.display = "block";
    }
  }
  
  function closeDoctorModal() {
    document.getElementById("doctorModal").style.display = "none";
  }
  
  window.onclick = function (event) {
    const modal = document.getElementById("doctorModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  
  
  
  