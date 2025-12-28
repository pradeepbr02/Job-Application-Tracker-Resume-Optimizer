// import Application from '../models/application.model.js'

// export const getDashboardAnalytics = async(req , res)=>{
//     try{
//         const userId = req.user

//         const totalApplications = await Application.countDocuments({
//             user : userId
//         })

//         const statusBreakdown = await Application.aggregate([
//             {$match : {user : userId}},
//             {
//                 $group :{
//                     _id : '$status' ,
//                     count : {$sum  : 1},
//                 },
//             },
//         ])

//         const avgScoreResult = await Application.aggregate([
//             {$match : {user : userId , aiScore : {$ne : null}}},
//             {$group : {_id : null , avgScore :{$avg : '$aiScore'}}}
//         ])

//         const averageAiScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore):null

//         const monthlyApplications = await Application.aggregate([
//             {$match : {user : userId}},
//             {
//                 $group :{
//                     _id :{
//                         year : {$year : '$appliedDate'},
//                         month : {$month : '$appliedDate'}
//                     },
//                     count : {$sum : 1},
//                 }
//             },
//             {$sort : {'_id.year' : 1 , '_id.month' : 1}}
//         ])

//         const missingSkills = await Application.aggregate([
//             {$match :{user : userId , 'aiAnalysis.missingSkills' : {$exists:true}}},
//             {$unwind : '$aiAnalysis.missingSkills'} ,
//             {
//                 $group :{
//                     _id : '$aiAnalysis.missingSkills' ,
//                     count : {$sum :1}
//                 }
//             },
//             {$sort : {count : 1} },
//             {$limit : 5}

//         ])

//         return res.status(200).json({
//             totalApplications,
//             statusBreakdown,
//             averageAiScore,
//             monthlyApplications,
//             topMissingSkills: missingSkills
//         })
//     }
//     catch(err){
//             console.log(err)
//             return res.status(500).json({
//                 message : "failed to fetch analytics"
//             })
//     }
// }

import Application from '../models/application.model.js'
import mongoose from 'mongoose'

export const getDashboardAnalytics = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user)

 
    const totalApplications = await Application.countDocuments({
      user: userObjectId,
    })

    const statusAgg = await Application.aggregate([
      { $match: { user: userObjectId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const statusBreakdown = {}
    statusAgg.forEach((item) => {
      statusBreakdown[item._id] = item.count
    })

  
    const avgScoreResult = await Application.aggregate([
      { $match: { user: userObjectId, aiScore: { $ne: null } } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$aiScore' },
        },
      },
    ])

    const averageAiScore =
      avgScoreResult.length > 0
        ? Math.round(avgScoreResult[0].avgScore)
        : null

    const monthlyApplications = await Application.aggregate([
      {
        $match: {
          user: userObjectId,
          appliedDate: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$appliedDate' },
            month: { $month: '$appliedDate' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ])

    const missingSkills = await Application.aggregate([
      {
        $match: {
          user: userObjectId,
          'aiAnalysis.missingSkills': { $exists: true },
        },
      },
      { $unwind: '$aiAnalysis.missingSkills' },
      {
        $group: {
          _id: '$aiAnalysis.missingSkills',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ])

    return res.status(200).json({
      totalApplications,
      statusBreakdown,
      averageAiScore,
      monthlyApplications,
      topMissingSkills: missingSkills,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Failed to fetch analytics',
    })
  }
}
