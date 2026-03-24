-- MySQL schema for candidate registration
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    father_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male','Female','Other') NOT NULL,
    mobile VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    aadhaar VARCHAR(12),
    qualification VARCHAR(50) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    year_of_passing INT NOT NULL,
    percentage VARCHAR(20) NOT NULL,
    applying_for VARCHAR(20) NOT NULL,
    experience ENUM('Fresher','Experienced') NOT NULL,
    skills TEXT NOT NULL,
    preferred_location VARCHAR(100) NOT NULL,
    resume LONGBLOB NOT NULL,
    photo LONGBLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
