

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

courses[0].completed = true;
courses[1].completed = true;
courses[2].completed = true;
courses[3].completed = true;
courses[4].completed = true;

const displayCourses = (filter = 'All') => {
    

    const container = document.getElementById('courses-container');
    container.innerHTML = ''; // Clear previous content

    let filtered = courses;
    if (filter !== 'All') {
        filtered = courses.filter(course => course.subject === filter);
    }

    const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#number-credit").innerHTML = `Total number of credits for all courses is ${totalCredits}`;

    filtered.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-card' + (course.completed ? ' completed' : ' not-completed');
        courseDiv.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Certificate:</strong> ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
            <p class="status">${course.completed ? '✅ Completed' : '⏳ Not Completed'}</p>
        `;
        container.appendChild(courseDiv);
    });
}

const cert = document.querySelectorAll('.cert');


cert.forEach(button => {
    button.addEventListener('click', (e) => {
        displayCourses(button.textContent); // or use button.dataset.filter if you set it
        displayCourseDetails(courses);
    });
});

function displayCourseDetails(course) {
  const courseDetails = document.querySelector("#course-details");
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology}</p>
  `;
  
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });

}


