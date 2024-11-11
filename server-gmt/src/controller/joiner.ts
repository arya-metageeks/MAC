import catchAsyncError from "../middlewere/catchAsyncError";
import Joiner from "../model/tournamentJoiningModel"
 
export const joiningTournament = catchAsyncError( async ( req, res,next ) => {

    console.log( req.body );

    const joiningTeam = await Joiner.create( req.body )
    res.status(201).json({success: true, joiningTeam })
} )
 