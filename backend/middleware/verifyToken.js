import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	
	const token = req.cookies.token;
	console.log(req);
	
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
		if(decoded){
			console.log(token);
			
			req.body.userId = decoded.userId;
			req.userId = decoded.userId;
		}

		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};