import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import User from '../models/User.js';
import Story from '../models/Story.js';
import { inngest } from '../inngest/index.js';

// Add User Story
export const addUserStory = async (req, res) => {
    try {
        const {userId} = req.auth();
        const {content, media_type, background_color} = req.body;
        const media = req.file
        let media_url = ''

        // upload media to imagekit
        if (media_type === 'image' || media_type === 'video') {
            const response = await imagekit.files.upload({
                file: fs.createReadStream(media.path),
                fileName: media.originalname,
                folder: 'stories',
            });

            // optimized URLs
            if (media_type === 'image') {
                if (!process.env.IMAGEKIT_URL_ENDPOINT) {
                    throw new Error('IMAGEKIT_URL_ENDPOINT is not set.');
                }

                media_url = imagekit.helper.buildSrc({
                    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
                    src: response.filePath,
                    transformation: [
                        {
                            width: 1080,
                            format: 'webp',
                            raw: 'q-auto',
                        },
                    ],
                });
            } else {
                media_url = response.url;
            }

            if (fs.existsSync(media.path)) fs.unlinkSync(media.path);            
        }
        // create story
        const story = await Story.create({
            user: userId,
            content,
            media_url,
            media_type,
            background_color
        })

        // schedule story deletion after 24 hours
        await inngest.send({
            name: 'app/story.delete',
            data: {storyId: story._id}
        })

        res.json({success: true, story})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

// Get User Stories
export const getStories = async (req, res) => {
    try {
        const {userId} = req.auth();
        const user = await User.findById(userId)

        // User connections and followings
        const userIds = [userId, ...user.connections, ...user.following]

        const stories = await Story.find({
            user: {$in: userIds}
        }).populate('user').sort({createdAt: -1});

        res.json({success: true, stories});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}