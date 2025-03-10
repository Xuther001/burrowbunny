import models from '../index.js';
import ListingService from '../service/ListingService.js';

const { Listing, UserProperty, Property } = models;

export const createListing = async (req, res) => {
    try {

        const userProperty = await UserProperty.findOne({
            where: {property_id: req.body.property_id }
        })

        if (String(req.user.user_id) != String(userProperty.user_id)) {
            return res.status(403).json({ message: 'User does not own this property' });
        }

        const listingData = req.body;

        const listing = await ListingService.createListing(listingData);
        return res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllListings = async (req, res) => {
    try {
        const listings = await ListingService.getAllListings();
        return res.status(200).json(listings);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getListingById = async (req, res) => {
    const listingId = req.params.id;

    try {
        const listing = await ListingService.getListingById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        return res.status(200).json(listing);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateListing = async (req, res) => {
    const listingId = req.params.id;
    const updateData = req.body;

    try {

        const userProperty = await UserProperty.findOne({
            where: {property_id: req.body.property_id }
        })

        if (String(req.user.user_id) != String(userProperty.user_id)) {
            return res.status(403).json({ message: 'User does not own this property' });
        }

        const updatedListing = await ListingService.updateListing(listingId, updateData);
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        return res.status(200).json({ message: 'Listing updated successfully', listing: updatedListing });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteListing = async (req, res) => {
    const listingId = req.params.id;

    try {
        const listing = await ListingService.getListingById(listingId);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        const propertyId = listing.property_id;

        const userProperty = await UserProperty.findOne({
            where: { property_id: propertyId }
        })

        if (String(req.user.user_id) != String(userProperty.user_id)) {
            return res.status(403).json({ message: 'User does not own this property' });
        }

        await ListingService.deleteListing(listingId);
        return res.status(200).json({ message: `Listing with ID ${listingId} deleted successfully` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
};