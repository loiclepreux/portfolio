<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact', methods: ['POST', 'OPTIONS'])]
    public function contact(Request $request, MailerInterface $mailer): JsonResponse
    {
        if ($request->isMethod('OPTIONS')) {
            return new JsonResponse(null, 204);
        }

        $data = json_decode($request->getContent(), true);

        $nom     = trim($data['nom'] ?? '');
        $email   = trim($data['email'] ?? '');
        $sujet   = trim($data['sujet'] ?? '');
        $message = trim($data['message'] ?? '');

        $errors = [];

        if (strlen($nom) < 2) {
            $errors['nom'] = 'Le nom est requis (minimum 2 caractères).';
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Une adresse email valide est requise.';
        }
        if (empty($sujet)) {
            $errors['sujet'] = 'Le sujet est requis.';
        }
        if (strlen($message) < 10) {
            $errors['message'] = 'Le message est requis (minimum 10 caractères).';
        }

        if (!empty($errors)) {
            return $this->json(['errors' => $errors], 400);
        }

        $emailMessage = (new Email())
            ->from('lepreux.loic@bbox.fr')
            ->to('lepreux.loic@bbox.fr')
            ->replyTo($email)
            ->subject('[Portfolio] ' . $sujet)
            ->text(sprintf(
                "Nouveau message de contact\n\nNom : %s\nEmail : %s\nSujet : %s\n\nMessage :\n%s",
                $nom, $email, $sujet, $message
            ))
            ->html(sprintf(
                '<h2 style="color:#22d3ee">Nouveau message de contact</h2>
                <p><strong>Nom :</strong> %s</p>
                <p><strong>Email :</strong> %s</p>
                <p><strong>Sujet :</strong> %s</p>
                <hr style="border-color:#22d3ee33">
                <p><strong>Message :</strong></p>
                <p style="white-space:pre-line">%s</p>',
                htmlspecialchars($nom),
                htmlspecialchars($email),
                htmlspecialchars($sujet),
                htmlspecialchars($message)
            ));

        try {
            $mailer->send($emailMessage);
        } catch (\Exception $e) {
            return $this->json(['error' => 'Erreur lors de l\'envoi du message. Veuillez réessayer.'], 500);
        }

        return $this->json(['success' => true, 'message' => 'Votre message a bien été envoyé.']);
    }
}
