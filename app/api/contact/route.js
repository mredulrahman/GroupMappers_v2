import { NextResponse } from "next/server";
import { connectMongo } from "../../../src/lib/mongodb";
import Contact from "../schema/contactSchema";

const validSources = ["contact-us", "footer", "contact-form"];
const validStatuses = ["new", "read", "replied", "archived"];

// POST /api/contact — submit a contact form
export async function POST(request) {
    try {
        await connectMongo();
        const body = await request.json();

        const name = body.name?.trim();
        const email = body.email?.trim().toLowerCase();
        const subject = body.subject?.trim() || "";
        const message = body.message?.trim();
        const source = body.source || "contact-form";

        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        if (!validSources.includes(source)) {
            return NextResponse.json(
                { message: "Invalid contact source." },
                { status: 400 }
            );
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            source,
            status: "new",
        });

        return NextResponse.json(
            { message: "Message sent successfully!", contact },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact POST error:", error);
        return NextResponse.json(
            { message: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}

// GET /api/contact — list all submissions (admin use)
export async function GET(request) {
    try {
        await connectMongo();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        const source = searchParams.get("source");

        const query = {};
        if (status) query.status = status;
        if (source) query.source = source;

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(200)
            .lean();

        return NextResponse.json({ contacts, total: contacts.length });
    } catch (error) {
        console.error("Contact GET error:", error);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// PATCH /api/contact — update status of a submission
export async function PATCH(request) {
    try {
        await connectMongo();
        const { _id, status } = await request.json();

        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { message: "Invalid status value." },
                { status: 400 }
            );
        }

        if (!_id) {
            return NextResponse.json(
                { message: "Contact id is required." },
                { status: 400 }
            );
        }

        const updated = await Contact.findByIdAndUpdate(
            _id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { message: "Contact not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ contact: updated });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// DELETE /api/contact — delete a submission
export async function DELETE(request) {
    try {
        await connectMongo();
        const { _id } = await request.json();

        if (!_id) {
            return NextResponse.json(
                { message: "Contact id is required." },
                { status: 400 }
            );
        }

        const deleted = await Contact.findByIdAndDelete(_id);
        if (!deleted) {
            return NextResponse.json(
                { message: "Contact not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Deleted successfully." });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
