import bcrypt from 'bcryptjs'

export const hashedPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10)
    return  bcrypt.hash(password , salt)
}

export const comparePassword = async(enteredPasswrd , hashedPassword)=>{
    return bcrypt.compare(enteredPasswrd , hashedPassword)
}