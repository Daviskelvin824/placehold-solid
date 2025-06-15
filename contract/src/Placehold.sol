// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ICourseCertificate {
    function mint(address to, uint256 courseId) external;
}

contract Placehold is Ownable {
    /* --------------------------------- struct --------------------------------- */
    struct Enrollment {
        bool enrolled;
        bool completed;
        bool stakeWithdrawn;
    }

    struct Course {
        uint256 id;
        string title;
        string description;
        string uri; // Optional: syllabus/metadata URL
        uint256 stakeAmount;
        bool active;
    }

    /* ---------------------------------- vars ---------------------------------- */
    IERC20 public immutable platformToken;
    ICourseCertificate public certificateNFT;

    uint256 public nextCourseId;
    mapping(uint256 => Course) public courses;
    mapping(uint256 => mapping(address => Enrollment)) public enrollments;
    mapping(uint256 => address[]) public studentsByCourse;

    /* ---------------------------------- event --------------------------------- */
    event CourseAdded(
        uint256 indexed courseId,
        string title,
        uint256 stakeAmount
    );
    event Enrolled(
        address indexed student,
        uint256 indexed courseId,
        uint256 amountStaked
    );
    event Completed(address indexed student, uint256 indexed courseId);
    event StakeWithdrawn(
        address indexed student,
        uint256 indexed courseId,
        uint256 amountReturned
    );

    /* -------------------------------------------------------------------------- */
    /*                                 constructor                                */
    /* -------------------------------------------------------------------------- */
    constructor(
        address _platformToken,
        address _certificateNFT
    ) Ownable(msg.sender) {
        platformToken = IERC20(_platformToken);
        certificateNFT = ICourseCertificate(_certificateNFT);
    }

    /* -------------------------------------------------------------------------- */
    /*                              course management                             */
    /* -------------------------------------------------------------------------- */
    function addCourse(
        string calldata title,
        string calldata description,
        string calldata uri,
        uint256 stakeAmount
    ) external onlyOwner {
        require(stakeAmount > 0, "Stake amount must be > 0");

        uint256 courseId = ++nextCourseId;
        courses[courseId] = Course(
            courseId,
            title,
            description,
            uri,
            stakeAmount,
            true
        );

        emit CourseAdded(courseId, title, stakeAmount);
    }

    function getCourse(uint256 courseId) external view returns (Course memory) {
        return courses[courseId];
    }

    function getAllCourses() external view returns (Course[] memory) {
        uint256 total = nextCourseId;
        Course[] memory result = new Course[](total);
        for (uint256 i = 1; i <= total; i++) {
            result[i - 1] = courses[i];
        }
        return result;
    }

    /* -------------------------------------------------------------------------- */
    /*                              enrollment logic                              */
    /* -------------------------------------------------------------------------- */
    function enrollInCourse(uint256 courseId) external {
        Course storage course = courses[courseId];
        require(courses[courseId].active, "Invalid course");

        Enrollment storage e = enrollments[courseId][msg.sender];
        require(!e.enrolled, "Already enrolled");

        // Transfer tokens to the contract as stake
        require(
            platformToken.transferFrom(
                msg.sender,
                address(this),
                course.stakeAmount
            ),
            "Token transfer failed"
        );

        e.enrolled = true;
        studentsByCourse[courseId].push(msg.sender);

        emit Enrolled(msg.sender, courseId, course.stakeAmount);
    }

    function markCompleted(
        uint256 courseId,
        address student
    ) external onlyOwner {
        Enrollment storage e = enrollments[courseId][student];
        require(e.enrolled, "Not enrolled");
        require(!e.completed, "Already completed");

        e.completed = true;

        // Auto mint NFT certificate on completion
        certificateNFT.mint(student, courseId);

        emit Completed(student, courseId);
    }

    function withdrawStake(uint256 courseId) external {
        Course storage course = courses[courseId];
        Enrollment storage e = enrollments[courseId][msg.sender];
        require(e.completed, "Course not completed");
        require(!e.stakeWithdrawn, "Already withdrawn");

        e.stakeWithdrawn = true;

        require(
            platformToken.transfer(msg.sender, course.stakeAmount),
            "Token return failed"
        );

        emit StakeWithdrawn(msg.sender, courseId, course.stakeAmount);
    }

    /* -------------------------------------------------------------------------- */
    /*                                 view helper                                */
    /* -------------------------------------------------------------------------- */

    function getStudents(
        uint256 courseId
    ) external view returns (address[] memory) {
        return studentsByCourse[courseId];
    }

    // Optional: Check enrollment status
    function isEnrolled(
        address student,
        uint256 courseId
    ) external view returns (bool) {
        return enrollments[courseId][student].enrolled;
    }

    // Optional: Check if completed
    function isCompleted(
        address student,
        uint256 courseId
    ) external view returns (bool) {
        return enrollments[courseId][student].completed;
    }
}
