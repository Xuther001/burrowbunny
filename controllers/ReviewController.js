import models from '../index.js';
import ReviewService from '../service/ReviewService.js';

const { Review } = models;

export const getAllReview = async () => {
    try {
        const reviews = await Review.findAll();
        return { review: reviews };
    } catch {
        return res.status(500).json({ message: error.message });
    }
}

export const getReviewById = async (userId, reviewId) => {
    try {
        const review = Review.getReviewById(reviewId);
        return { review: review };
    } catch {
        return res.status(500).json({ message: error.message });
    }
}

export const createReview = async (userId, reviewData) => {
    try {
        if (String(userId) !== String(reviewData.user_id)) {
            throw new Error('You can only create reviews with your own user ID');
        }

        const review = await Review.create(reviewData);
        return { review };
    } catch (error) {
        throw new Error('Error creating review: ' + error.message);
    }
};


export const editReview = async (req, res) => {
    try {
        const editReview = await ReviewService.editReview(req.body);
        return res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (userId, reviewId) => {
    try {
        const deleted = await ReviewService.deleteReview(reviewId);
        if (!deleted) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { getAllReview, getReviewById, createReview, editReview, deleteReview };