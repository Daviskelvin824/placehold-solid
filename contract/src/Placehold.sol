// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ICourseCertificate {
    function mint(address to, uint256 courseId) external;
}

contract Placehold is Ownable {
    struct Enrollment {
        bool enrolled;
        bool completed;
        bool stakeWithdrawn;
    }

    IERC20 public immutable platformToken;
    ICourseCertificate public certificateNFT;

    uint256 public enrollmentStakeAmount = 1_000 * 1e18;

    // courseId => student address => enrollment info
    mapping(uint256 => mapping(address => Enrollment)) public enrollments;
    mapping(address => uint256) public stakedBalances;

    event Enrolled(address indexed student, uint256 indexed courseId);
    event Completed(address indexed student, uint256 indexed courseId);
    event StakeWithdrawn(address indexed student, uint256 indexed courseId);

    constructor(
        address _platformToken,
        address _certificateNFT
    ) Ownable(msg.sender) {
        platformToken = IERC20(_platformToken);
        certificateNFT = ICourseCertificate(_certificateNFT);
    }

    function setStakeAmount(uint256 amount) external onlyOwner {
        enrollmentStakeAmount = amount;
    }

    function enrollInCourse(uint256 courseId) external {
        Enrollment storage e = enrollments[courseId][msg.sender];
        require(!e.enrolled, "Already enrolled");

        // Transfer tokens to the contract as stake
        require(
            platformToken.transferFrom(
                msg.sender,
                address(this),
                enrollmentStakeAmount
            ),
            "Token transfer failed"
        );

        e.enrolled = true;
        stakedBalances[msg.sender] += enrollmentStakeAmount;

        emit Enrolled(msg.sender, courseId);
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
        Enrollment storage e = enrollments[courseId][msg.sender];
        require(e.completed, "Course not completed");
        require(!e.stakeWithdrawn, "Already withdrawn");

        e.stakeWithdrawn = true;
        stakedBalances[msg.sender] -= enrollmentStakeAmount;

        require(
            platformToken.transfer(msg.sender, enrollmentStakeAmount),
            "Token return failed"
        );

        emit StakeWithdrawn(msg.sender, courseId);
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
